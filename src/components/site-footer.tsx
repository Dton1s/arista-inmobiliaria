import { ArrowUpRight, Instagram, Mail, Phone } from "lucide-react";
import { siteData } from "@/data/siteData";

export function SiteFooter() {
  const copyright = siteData.footer.copyright.replace("{year}", String(new Date().getFullYear()));
  return (
    <footer className="site-footer">
      <div className="footer-main page-shell">
        <div className="footer-brand-block"><a className="footer-brand" href="#inicio"><span className="brand-symbol" aria-hidden="true"><i /><i /><i /></span>{siteData.brand.name}</a><p>{siteData.footer.tagline}</p><small>{siteData.brand.conceptLabel}</small></div>
        <nav className="footer-nav" aria-label={siteData.ui.mainNavLabel}>{siteData.navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
        <div className="footer-contact">
          {siteData.contact.phone && <a href={`tel:${siteData.contact.phone}`}><Phone size={14} />{siteData.contact.phone}</a>}
          {siteData.contact.email && <a href={`mailto:${siteData.contact.email}`}><Mail size={14} />{siteData.contact.email}</a>}
          {siteData.footer.socialUrl && <a href={siteData.footer.socialUrl} target="_blank" rel="noreferrer"><Instagram size={14} />{siteData.ui.socialLabel} <ArrowUpRight size={12} /></a>}
        </div>
      </div>
      <div className="footer-bottom page-shell"><span>{copyright} · {siteData.footer.note}</span><a href={siteData.footer.agencyUrl} target="_blank" rel="noreferrer">{siteData.footer.agencyLabel} <ArrowUpRight size={13} /></a></div>
    </footer>
  );
}
