import { Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { contact, footer, whatsappUrl } from "@/content/landing";
import { Logo } from "@/components/ui/Logo";

export function SiteFooter() {
  const wa = whatsappUrl();
  return (
    <footer data-theme="dark" className="border-t border-line bg-deep text-ink">
      <div className="container-nu flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between md:py-16">
        <div>
          <Logo variant="color-oscuro" height={28} lazy />
          <p className="mt-4 text-body text-ink-muted">{footer.slogan}</p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          {wa ? (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-sm text-label text-ink hover:text-primary">
              <MessageCircle size={18} strokeWidth={1.5} aria-hidden />
              {footer.whatsappLabel}
            </a>
          ) : null}
          {contact.email ? (
            <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 rounded-sm text-label text-ink hover:text-primary">
              <Mail size={18} strokeWidth={1.5} aria-hidden />
              {contact.email}
            </a>
          ) : null}
          <Link href="/privacidad" className="rounded-sm text-label text-ink-muted hover:text-ink">
            {footer.privacy}
          </Link>
        </div>
      </div>
      <div className="container-nu border-t border-line py-6">
        <p className="text-caption text-ink-muted">{footer.byline}</p>
      </div>
    </footer>
  );
}
