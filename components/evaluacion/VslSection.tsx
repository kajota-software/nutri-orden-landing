import { vsl } from "@/content/evaluacion";

const SHOW = process.env.NEXT_PUBLIC_SHOW_VSL === "true";
const URL = process.env.NEXT_PUBLIC_VSL_URL;

/** Video de ventas. Oculto por defecto: sin NEXT_PUBLIC_SHOW_VSL="true" no renderiza nada. */
export function VslSection() {
  if (!SHOW || !URL) return null;
  return (
    <section aria-labelledby="vsl-title" className="mt-10">
      <h2 id="vsl-title" className="text-heading-2 text-ink">
        {vsl.title}
      </h2>
      <div className="mt-4 aspect-video overflow-hidden rounded-lg border border-line bg-surface shadow-sm">
        <iframe
          src={URL}
          title={vsl.title}
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          className="size-full"
        />
      </div>
    </section>
  );
}
