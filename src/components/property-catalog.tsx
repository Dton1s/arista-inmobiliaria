"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, BedDouble, Bath, Expand, MapPin, SlidersHorizontal } from "lucide-react";
import { useMemo, useRef, useState, type CSSProperties } from "react";
import { siteData, type PropertyType } from "@/data/siteData";

type Property = (typeof siteData.properties)[number];

function PropertyCard({ property, index }: { property: Property; index: number }) {
  const [imageIndex, setImageIndex] = useState(0);
  const image = property.gallery[imageIndex];
  const price = new Intl.NumberFormat("es-ES", { style: "currency", currency: siteData.ui.currency, maximumFractionDigits: 0 }).format(property.price);

  function changeImage(direction: number) {
    setImageIndex((current) => (current + direction + property.gallery.length) % property.gallery.length);
  }

  function requestVisit() {
    window.dispatchEvent(new CustomEvent("open-property-contact", { detail: { property: property.name } }));
  }

  return (
    <article className="property-card" style={{ "--card-index": index } as CSSProperties}>
      <div className="property-photo-wrap">
        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 700px) 88vw, (max-width: 1100px) 45vw, 31vw" className="property-photo" />
        <span className="property-tag">{property.tag}</span>
        <span className="property-operation">{property.operation}</span>
        {property.gallery.length > 1 && (
          <div className="gallery-controls" aria-label={`${property.name} · ${siteData.ui.imageCounterSeparator}`}>
            <button type="button" aria-label={siteData.ui.previousImage} onClick={() => changeImage(-1)}><ArrowLeft size={15} /></button>
            <span>{String(imageIndex + 1).padStart(2, "0")} {siteData.ui.imageCounterSeparator} {String(property.gallery.length).padStart(2, "0")}</span>
            <button type="button" aria-label={siteData.ui.nextImage} onClick={() => changeImage(1)}><ArrowRight size={15} /></button>
          </div>
        )}
      </div>
      <div className="property-card-body">
        <div className="property-heading-row"><span>{property.type} · {property.province}</span><span className="property-ref">{siteData.ui.propertyReferencePrefix} {property.id.toUpperCase()}</span></div>
        <h3>{property.name}</h3>
        <p className="property-locality"><MapPin size={13} />{property.locality}</p>
        <p className="property-description">{property.description}</p>
        <div className="property-specs">
          <span><BedDouble size={15} />{property.bedrooms} {siteData.ui.bedroomUnit}</span>
          <span><Bath size={15} />{property.bathrooms} {siteData.ui.bathroomUnit}</span>
          <span><Expand size={14} />{property.area} {siteData.ui.squareMeters}</span>
        </div>
        <div className="property-card-bottom">
          <p className="property-price"><strong>{price}</strong><small>{property.pricePeriod}</small></p>
          <button className="property-action" type="button" aria-label={`${siteData.ui.requestVisit}: ${property.name}`} onClick={requestVisit}><ArrowUpRight size={17} /></button>
        </div>
      </div>
    </article>
  );
}

export function PropertyCatalog() {
  const [locality, setLocality] = useState("");
  const [operation, setOperation] = useState("Todas");
  const [type, setType] = useState("Todos");
  const trackRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => siteData.properties.filter((property) => {
    const matchesLocality = !locality.trim() || `${property.locality} ${property.province}`.toLocaleLowerCase("es").includes(locality.trim().toLocaleLowerCase("es"));
    const matchesOperation = operation === "Todas" || property.operation === operation;
    const matchesType = type === "Todos" || property.type === type;
    return matchesLocality && matchesOperation && matchesType;
  }), [locality, operation, type]);

  function slide(direction: number) {
    if (!trackRef.current) return;
    const card = trackRef.current.querySelector<HTMLElement>(".property-card");
    trackRef.current.scrollBy({ left: direction * ((card?.offsetWidth ?? 360) + 22), behavior: "smooth" });
  }

  function clearFilters() {
    setLocality("");
    setOperation("Todas");
    setType("Todos");
    trackRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }

  const resultLabel = filtered.length === 1 ? siteData.search.resultSingular : siteData.search.resultPlural;

  return (
    <section className="catalog-section section-shell" id="propiedades">
      <div className="section-header">
        <div><p className="eyebrow"><SlidersHorizontal size={14} />{siteData.search.eyebrow}</p><h2>{siteData.search.title}</h2></div>
        <p>{siteData.search.description}</p>
      </div>
      <div className="search-panel">
        <label className="search-field locality-field"><span>{siteData.search.localityLabel}</span><input value={locality} onChange={(event) => setLocality(event.target.value)} placeholder={siteData.search.localityPlaceholder} /></label>
        <label className="search-field"><span>{siteData.search.operationLabel}</span><select value={operation} onChange={(event) => setOperation(event.target.value)}>{siteData.search.operationOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
        <label className="search-field"><span>{siteData.search.typeLabel}</span><select value={type} onChange={(event) => setType(event.target.value)}>{siteData.search.typeOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
        <a className="button button-dark search-submit" href="#resultados">{siteData.search.submitLabel} <ArrowRight size={16} /></a>
      </div>
      <div className="catalog-toolbar" id="resultados">
        <p><strong>{String(filtered.length).padStart(2, "0")}</strong> {resultLabel}</p>
        <div className="carousel-actions">
          {(locality || operation !== "Todas" || type !== "Todos") && <button className="clear-filters" onClick={clearFilters}>{siteData.search.clearFilters}</button>}
          <button aria-label={siteData.ui.previousImage} onClick={() => slide(-1)}><ArrowLeft size={17} /></button>
          <button aria-label={siteData.ui.nextImage} onClick={() => slide(1)}><ArrowRight size={17} /></button>
        </div>
      </div>
      {filtered.length ? (
        <div className="property-track" ref={trackRef} aria-live="polite">
          {filtered.map((property, index) => <PropertyCard key={property.id} property={property} index={index} />)}
        </div>
      ) : (
        <div className="no-results"><span>—</span><h3>{siteData.search.noResultsTitle}</h3><p>{siteData.search.noResultsBody}</p><button className="text-action" onClick={clearFilters}>{siteData.search.clearFilters} <ArrowUpRight size={15} /></button></div>
      )}
    </section>
  );
}
