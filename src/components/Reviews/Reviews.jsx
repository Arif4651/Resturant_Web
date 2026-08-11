import { useEffect, useRef } from 'react'
import { Star, ExternalLink } from 'lucide-react'
import reviewsData from '../../data/reviewsData.json'
import siteSettings from '../../data/siteSettings.json'
import SectionHeading from '../ui/SectionHeading'
import './Reviews.css'

export default function Reviews() {
  const ref = useRef(null)
  const visibleReviews = reviewsData.reviews.filter(r => r.isVisible)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('rev--visible')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="rev section" id="reviews" ref={ref}>
      <div className="container">
        <SectionHeading
          overline="Guest Experiences"
          title="Loved for the atmosphere."
          subtitle={`Rated ${siteSettings.googleRating.score} on Google with ${siteSettings.googleRating.label}.`}
        />

        <div className="rev__grid">
          {visibleReviews.map((review, i) => (
            <div className="rev__card" key={review.id} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="rev__stars">
                {Array.from({ length: 5 }, (_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className={j < review.rating ? 'rev__star rev__star--filled' : 'rev__star'}
                  />
                ))}
              </div>
              <p className="rev__text">"{review.text}"</p>
              <div className="rev__author">
                <div className="rev__avatar">{review.name.charAt(0)}</div>
                <div>
                  <span className="rev__name">{review.name}</span>
                  <span className="rev__source">
                    <ExternalLink size={10} /> {review.source} Review
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rev__cta-wrap">
          <a
            href="https://www.google.com/maps/search/HAWA+Rooftop+Mirpur+12+Dhaka"
            target="_blank"
            rel="noopener noreferrer"
            className="rev__cta"
          >
            Read More Reviews
          </a>
        </div>
      </div>
    </section>
  )
}
