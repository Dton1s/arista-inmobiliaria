"use client";

import { ArrowUpRight, X } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";
import { siteData } from "@/data/siteData";

export function ContactModal() {
  const [open, setOpen] = useState(false);
  const [property, setProperty] = useState("");
  const [confirmation, setConfirmation] = useState("");

  useEffect(() => {
    const onOpen = (event: Event) => {
      const customEvent = event as CustomEvent<{ property?: string }>;
      setProperty(customEvent.detail?.property ?? "");
      setConfirmation("");
      setOpen(true);
    };
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("open-property-contact", onOpen);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("open-property-contact", onOpen);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const chosenProperty = String(form.get("property") || property || "una propiedad");
    const whatsapp = siteData.contact.whatsapp.replace(/\D/g, "");
    if (whatsapp) {
      const message = [
        `${siteData.contact.whatsappIntro} ${chosenProperty}.`,
        `${siteData.contact.nameLabel}: ${form.get("name")}`,
        `${siteData.contact.phoneLabel}: ${form.get("phone")}`,
      ].join("\n");
      window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
      setConfirmation(siteData.contact.sentMessage);
      return;
    }
    if (siteData.contact.email) {
      const subject = encodeURIComponent(`${siteData.brand.name} · Consulta sobre ${chosenProperty}`);
      const body = encodeURIComponent(`${siteData.contact.nameLabel}: ${form.get("name")}\n${siteData.contact.phoneLabel}: ${form.get("phone")}\n${siteData.contact.propertyLabel}: ${chosenProperty}`);
      window.location.href = `mailto:${siteData.contact.email}?subject=${subject}&body=${body}`;
      setConfirmation(siteData.contact.sentMessage);
      return;
    }
    setConfirmation(siteData.contact.noContactChannel);
  }

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section className="contact-modal" role="dialog" aria-modal="true" aria-label={siteData.contact.modalLabel}>
        <button className="modal-close" onClick={() => setOpen(false)} aria-label={siteData.contact.closeLabel}><X size={19} /></button>
        <p className="eyebrow">{siteData.contact.eyebrow}</p>
        <h2>{siteData.contact.title}</h2>
        <p className="modal-description">{siteData.contact.description}</p>
        {confirmation ? (
          <div className="contact-confirmation" role="status"><span>✓</span><p>{confirmation}</p><button className="text-action" onClick={() => setOpen(false)}>{siteData.ui.viewAll} <ArrowUpRight size={15} /></button></div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>{siteData.contact.nameLabel}<input name="name" placeholder={siteData.contact.namePlaceholder} autoComplete="name" required /></label>
            <label>{siteData.contact.phoneLabel}<input name="phone" type="tel" placeholder={siteData.contact.phonePlaceholder} autoComplete="tel" required /></label>
            <label>{siteData.contact.propertyLabel}<input name="property" defaultValue={property} placeholder={siteData.contact.propertyPlaceholder} /></label>
            <button className="button button-dark modal-submit" type="submit">{siteData.contact.submitLabel} <ArrowUpRight size={16} /></button>
          </form>
        )}
      </section>
    </div>
  );
}
