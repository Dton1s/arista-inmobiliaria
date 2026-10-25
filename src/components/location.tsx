import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { siteData } from "@/data/siteData";

export function Location() {
  return (
    <section className="location-section section-shell" id="contacto">
      <div className="location-heading"><p className="eyebrow">{siteData.location.eyebrow}</p><h2>{siteData.location.title}</h2><p>{siteData.location.description}</p></div>
      <div className="location-grid">
        <div className="map-card" role="img" aria-label={siteData.location.mapLabel}>
          <svg className="map-drawing" viewBox="0 0 720 430" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <path d="M-20 112 C135 96 161 175 306 156 S480 74 748 112" />
            <path d="M-30 303 C103 248 198 342 320 286 S513 228 752 282" />
            <path d="M168 -18 C202 80 177 143 225 223 S315 319 296 450" />
            <path d="M494 -15 C462 81 535 147 485 229 S428 329 468 454" />
            <path className="map-road-main" d="M-15 210 C149 226 233 192 359 225 S588 206 743 223" />
            <path className="map-road-main" d="M355 -20 C332 79 380 137 349 226 S337 333 363 450" />
            <circle className="map-pin-ring" cx="359" cy="220" r="33" />
            <circle className="map-pin" cx="359" cy="220" r="8" />
            <text x="390" y="216">ARISTA</text>
            <text x="390" y="235">VALENCIA</text>
          </svg>
          <span className="map-scale">39°28′ N&nbsp;&nbsp; 0°22′ W</span>
          <span className="map-stamp">{siteData.location.area}</span>
        </div>
        <div className="location-details">
          <article><span className="detail-icon"><MapPin size={17} /></span><div><small>{siteData.location.eyebrow}</small><p>{siteData.location.address}</p><b>{siteData.location.area}</b></div></article>
          <article className="hours-card"><span className="detail-icon"><Clock3 size={17} /></span><div><small>{siteData.location.hoursTitle}</small><ul>{siteData.location.hours.map((slot) => <li key={slot.days}><span>{slot.days}</span><b>{slot.time}</b></li>)}</ul></div></article>
          <a className="button button-dark maps-link" href={siteData.location.mapsUrl} target="_blank" rel="noreferrer">{siteData.ui.mapAction} <ArrowUpRight size={16} /></a>
          <p className="location-note">{siteData.location.note}</p>
        </div>
      </div>
    </section>
  );
}
