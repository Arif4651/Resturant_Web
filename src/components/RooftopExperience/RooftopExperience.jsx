import { useEffect, useRef } from 'react'
import SectionHeading from '../ui/SectionHeading'
import './RooftopExperience.css'

const experiences = [
  { image: '/images/gallery/unnamed9.jpg', title: 'Rooftop Escape', desc: 'A boat above the city — where imagination meets reality.' },
  { image: '/images/gallery/unn11amed.jpg', title: 'Evening Dining', desc: 'As the sun sets, HAWA comes alive with warm lights and cool breezes.' },
  { image: '/images/gallery/unnam3ed.jpg', title: 'Interior Elegance', desc: 'When you prefer air-conditioned comfort with the same premium experience.' },
  { image: '/images/gallery/unna6med.jpg', title: 'Garden Seating', desc: 'Surrounded by green, every bite tastes a little more alive.' },
]

export default function RooftopExperience() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('roof--visible')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="roof section" id="rooftop" ref={ref}>
      <div className="container">
        <SectionHeading
          overline="The Atmosphere"
          title="Come for the food. Stay for the Hawa."
          subtitle="Every corner of HAWA tells a different story. Explore the spaces that make us unique."
        />

        <div className="roof__grid">
          {experiences.map((exp, i) => (
            <div className="roof__card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="roof__card-image-wrap">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="roof__card-image"
                  loading="lazy"
                />
                <div className="roof__card-overlay" />
              </div>
              <div className="roof__card-content">
                <h3 className="roof__card-title">{exp.title}</h3>
                <p className="roof__card-desc">{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
