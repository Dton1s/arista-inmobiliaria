"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { siteData } from "@/data/siteData";

export function Hero() {
  function requestContact() {
    window.dispatchEvent(new CustomEvent("open-property-contact", { detail: { property: "" } }));
  }

  return (
    <section className="hero-section" id="inicio">
      <div className="hero-image-wrap" aria-hidden="true">
        <Image src={siteData.hero.image} alt="" fill priority sizes="100vw" className="hero-image" />
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-content page-shell">
        <p className="hero-eyebrow"><span />{siteData.hero.eyebrow}</p>
        <h1>{siteData.hero.titleLineOne}<br /><em>{siteData.hero.titleLineTwo}</em></h1>
        <p className="hero-description">{siteData.hero.description}</p>
        <div className="hero-actions">
          <a className="button button-light" href="#propiedades">{siteData.hero.primaryAction} <ArrowDown size={16} /></a>
          <button className="button button-outline" onClick={requestContact}>{siteData.hero.secondaryAction} <ArrowUpRight size={16} /></button>
        </div>
      </div>
      <div className="hero-bottom page-shell">
        <span><MapPin size={14} />{siteData.hero.imageCaption}</span>
        <span className="hero-status">{siteData.hero.status}</span>
        <span className="hero-index">{siteData.hero.imageIndex}<i />{siteData.hero.imageTotal}</span>
      </div>
      <span className="hero-coordinate" aria-hidden="true">{siteData.hero.coordinates}</span>
    </section>
  );
}
