import { useEffect, useRef } from 'react'
import './DayNightTransition.css'

export default function DayNightTransition() {
  const ref = useRef(null)
  const nightRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current || !nightRef.current) return
      const rect = ref.current.getBoundingClientRect()
      const viewH = window.innerHeight
      const sectionH = ref.current.offsetHeight

      if (rect.top < viewH && rect.bottom > 0) {
        const progress = Math.max(0, Math.min(1, (viewH - rect.top) / (viewH + sectionH)))
        nightRef.current.style.opacity = Math.min(1, progress * 1.8)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="daynight section" ref={ref} aria-label="Day to night atmosphere transition">
      <div className="daynight__images">
        <img
          src="/images/gallery/unname8d.jpg"
          alt="HAWA rooftop during daytime"
          className="daynight__day"
          loading="lazy"
        />
        <img
          src="/images/gallery/unn11amed.jpg"
          alt="HAWA rooftop at night with warm lighting"
          className="daynight__night"
          ref={nightRef}
          loading="lazy"
        />
        <div className="daynight__overlay" />
      </div>

      <div className="daynight__content container">
        <span className="overline">From Dawn to Dusk</span>
        <h2 className="daynight__title">
          A different HAWA,<br />every hour of the day.
        </h2>
        <p className="daynight__subtitle">
          Morning tranquility. Golden sunset. Starlit evenings. Each visit tells a new story.
        </p>

        <div className="daynight__times">
          <div className="daynight__time">
            <span className="daynight__time-label">☀️ Afternoon</span>
            <span className="daynight__time-desc">Peaceful, green, sunlit</span>
          </div>
          <div className="daynight__time">
            <span className="daynight__time-label">🌅 Sunset</span>
            <span className="daynight__time-desc">Golden hour magic</span>
          </div>
          <div className="daynight__time">
            <span className="daynight__time-label">🌙 Evening</span>
            <span className="daynight__time-desc">Warm lights, cool breeze</span>
          </div>
        </div>
      </div>
    </section>
  )
}
