import { useEffect, useRef } from 'react'
import './SectionHeading.css'

export default function SectionHeading({ overline, title, subtitle, align = 'center', light = false }) {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-heading--visible')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={`section-heading section-heading--${align} ${light ? 'section-heading--light' : ''}`} ref={ref}>
      {overline && <span className="section-heading__overline overline">{overline}</span>}
      {title && <h2 className="section-heading__title">{title}</h2>}
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
      <div className="section-heading__line divider" />
    </div>
  )
}
