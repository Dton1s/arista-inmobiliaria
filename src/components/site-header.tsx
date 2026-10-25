"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { siteData } from "@/data/siteData";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  function requestContact() {
    setMenuOpen(false);
    window.dispatchEvent(new CustomEvent("open-property-contact", { detail: { property: "" } }));
  }

  return (
    <header className="site-header">
      <div className="header-inner page-shell">
        <a className="brand-lockup" href="#inicio" aria-label={siteData.brand.name}>
          <span className="brand-symbol" aria-hidden="true"><i /><i /><i /></span>
          <span><b>{siteData.brand.name}</b><small>{siteData.brand.descriptor}</small></span>
        </a>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label={siteData.ui.mainNavLabel}>
          {siteData.navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
          <button className="header-cta mobile-cta" onClick={requestContact}>{siteData.contact.submitLabel} <ArrowUpRight size={15} /></button>
        </nav>
        <button className="header-cta desktop-cta" onClick={requestContact}>{siteData.contact.submitLabel} <ArrowUpRight size={15} /></button>
        <button className="menu-toggle" aria-label={menuOpen ? siteData.ui.menuClose : siteData.ui.menuOpen} aria-expanded={menuOpen} onClick={() => setMenuOpen((current) => !current)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
