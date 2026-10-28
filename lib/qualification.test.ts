import { describe, expect, it } from "vitest";
import {
  calcularDolor,
  calcularEstimacion,
  calcularPuntos,
  evaluar,
  formatUsd,
  puntosDolores,
  type Answers,
} from "./qualification";

const base: Answers = {
  pacientes: "10_30",
  facturacion: "500_1500",
  retencion: "5_7",
  entrega: "excel_pdf",
  horas: "2_5",
  dolores: ["no_vuelven", "tiempo_planes"],
  urgencia: "3_meses",
};

describe("puntaje", () => {
  it("suma los puntos de cada respuesta", () => {
    // pacientes 2 + facturación 1 + retención 2 + entrega 2 + horas 1 + dolores 2 + urgencia 2
    expect(calcularPuntos(base)).toBe(12);
  });

  it("calcula el dolor con retención, entrega, horas y lo que más cuesta", () => {
    expect(calcularDolor(base)).toBe(2 + 2 + 1 + 2);
  });

  it("limita 'lo que más te cuesta' a 3 puntos", () => {
    expect(puntosDolores(["no_vuelven", "no_cumplen", "tiempo_planes", "seguimiento", "cobrar"])).toBe(3);
    expect(puntosDolores(["cobrar", "cobrar"])).toBe(1);
  });

  it("el dolor máximo es 11", () => {
    const max: Answers = {
      ...base,
      retencion: "menos_5",
      entrega: "papel",
      horas: "mas_10",
      dolores: ["no_vuelven", "no_cumplen", "tiempo_planes", "seguimiento"],
    };
    expect(calcularDolor(max)).toBe(11);
  });
});

describe("resultado", () => {
  it("califica", () => {
    const r = evaluar(base);
    expect(r.resultado).toBe("califica");
    expect(r.motivo).toBeNull();
  });

  it("prioridad alta con 31+ pacientes y urgencia este mes", () => {
    expect(evaluar({ ...base, pacientes: "31_80", urgencia: "este_mes" }).resultado).toBe("prioridad_alta");
    expect(evaluar({ ...base, pacientes: "mas_80", urgencia: "este_mes" }).resultado).toBe("prioridad_alta");
  });

  it("10–30 pacientes con urgencia este mes es califica, no prioridad", () => {
    expect(evaluar({ ...base, urgencia: "este_mes" }).resultado).toBe("califica");
  });

  it("31+ pacientes en 3 meses es califica, no prioridad", () => {
    expect(evaluar({ ...base, pacientes: "31_80" }).resultado).toBe("califica");
  });

  it("aún no si solo está explorando", () => {
    const r = evaluar({ ...base, urgencia: "explorando" });
    expect(r.resultado).toBe("aun_no");
    expect(r.motivo).toBeNull();
  });

  it("no califica con menos de 10 pacientes (motivo tamaño)", () => {
    const r = evaluar({ ...base, pacientes: "menos_10", urgencia: "este_mes" });
    expect(r.resultado).toBe("no_califica");
    expect(r.motivo).toBe("tamano");
  });

  it("no califica con facturación menor a $500 (motivo volumen)", () => {
    const r = evaluar({ ...base, facturacion: "menos_500" });
    expect(r.resultado).toBe("no_califica");
    expect(r.motivo).toBe("volumen");
  });

  it("no califica con dolor menor a 4", () => {
    const r = evaluar({
      ...base,
      retencion: "8_10",
      entrega: "otra",
      horas: "menos_2",
      dolores: ["cobrar", "seguimiento"],
    });
    expect(r.dolor).toBe(3);
    expect(r.resultado).toBe("no_califica");
    expect(r.motivo).toBe("dolor");
  });

  it("dolor exactamente 4 sí califica", () => {
    const r = evaluar({ ...base, retencion: "8_10", entrega: "otra", horas: "menos_2", dolores: ["cobrar", "seguimiento", "no_vuelven"] });
    expect(r.dolor).toBe(4);
    expect(r.resultado).toBe("califica");
  });

  it("no califica tiene prioridad sobre explorando", () => {
    expect(evaluar({ ...base, pacientes: "menos_10", urgencia: "explorando" }).resultado).toBe("no_califica");
  });
});

describe("estimación", () => {
  it("usa puntos medios y tasa de abandono", () => {
    const e = calcularEstimacion({ ...base, pacientes: "31_80", facturacion: "1500_4000", retencion: "menos_5" });
    expect(e.pacientes).toBe(55);
    expect(e.pacientesEnRiesgo).toBe(33); // 55 × 0,60
    expect(e.valorPorPaciente).toBe(50); // 2750 ÷ 55
    expect(e.pacientesARecuperar).toBe(4);
    expect(e.valorRecuperar).toBe(200);
  });

  it("10–30 pacientes y $500–1 500 con 5 a 7", () => {
    const e = calcularEstimacion(base);
    expect(e.pacientesEnRiesgo).toBe(8); // 20 × 0,40
    expect(e.valorRecuperar).toBe(200); // 4 × 1000 ÷ 20
  });

  it("no promete recuperar más pacientes de los que están en riesgo", () => {
    const e = calcularEstimacion({ ...base, retencion: "8_10" }); // 20 × 0,15 = 3
    expect(e.pacientesEnRiesgo).toBe(3);
    expect(e.pacientesARecuperar).toBe(3);
    expect(e.valorRecuperar).toBe(150);
  });
});

describe("formatUsd", () => {
  it("separa miles con espacio", () => {
    expect(formatUsd(1375)).toBe("$1 375");
    expect(formatUsd(200)).toBe("$200");
  });
});
