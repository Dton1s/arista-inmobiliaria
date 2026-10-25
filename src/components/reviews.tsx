import { ArrowUpRight, Star } from "lucide-react";
import { siteData } from "@/data/siteData";

export function Reviews() {
  return (
    <section className="experience-section section-shell" id="experiencia">
      <div className="experience-top">
        <div className="experience-copy">
          <p className="eyebrow">{siteData.experience.eyebrow}</p>
          <h2>{siteData.experience.title}</h2>
          <p>{siteData.experience.description}</p>
          <div className="experience-points">
            {siteData.experience.points.map((point) => <article key={point.number}><span>{point.number}</span><div><h3>{point.title}</h3><p>{point.description}</p></div></article>)}
          </div>
        </div>
        <div className="review-score-card">
          <div className="review-google">{siteData.reviews.source} <ArrowUpRight size={15} /></div>
          <div className="review-score"><strong>{siteData.reviews.rating}</strong><div><span className="stars" aria-label={siteData.ui.reviewStars.replace("{count}", String(siteData.reviews.stars))}>{Array.from({ length: siteData.reviews.stars }, (_, i) => <Star key={i} size={15} fill="currentColor" strokeWidth={1.1} />)}</span><small>{siteData.reviews.total}</small></div></div>
          {siteData.reviews.quotes.map((quote, index) => <blockquote key={quote.author}><span aria-hidden="true">“</span><p>{quote.text}</p><footer><b>{quote.author}</b><small>{quote.detail}</small><i>0{index + 1}</i></footer></blockquote>)}
          <p className="review-disclaimer">{siteData.reviews.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
