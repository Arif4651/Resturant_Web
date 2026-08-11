import { useEffect, useRef } from 'react'
import SectionHeading from '../ui/SectionHeading'
import './ExperienceIntro.css'

export default function ExperienceIntro() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('exp--visible')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="exp section" id="experience" ref={sectionRef}>
      <div className="container">
        <div className="exp__grid">
          <div className="exp__image-wrap">
            <div className="exp__image-mask">
              <img
                src="/images/gallery/unname8d.jpg"
                alt="HAWA rooftop outdoor seating surrounded by lush greenery"
                className="exp__image"
                loading="lazy"
              />
            </div>
          </div>

          <div className="exp__content">
            <SectionHeading
              overline="The HAWA Experience"
              title="More than a meal. A place to breathe."
              align="left"
            />
            <p className="exp__text">
              Nestled above the heart of Mirpur, HAWA is a rooftop sanctuary where the city's rhythm meets nature's calm. Here, lush greenery frames every table, fairy lights dance with the evening breeze, and the open sky becomes your ceiling.
            </p>
            <p className="exp__text">
              Whether it's a romantic evening for two, a joyful family gathering, or a celebration with friends — HAWA transforms every meal into a moment you'll remember.
            </p>

            <div className="exp__features">
              <div className="exp__feature">
                <span className="exp__feature-icon">🌿</span>
                <span className="exp__feature-text">Open Rooftop</span>
              </div>
              <div className="exp__feature">
                <span className="exp__feature-icon">🌅</span>
                <span className="exp__feature-text">Sunset Views</span>
              </div>
              <div className="exp__feature">
                <span className="exp__feature-icon">🎉</span>
                <span className="exp__feature-text">Celebrations</span>
              </div>
              <div className="exp__feature">
                <span className="exp__feature-icon">💫</span>
                <span className="exp__feature-text">City Lights</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
