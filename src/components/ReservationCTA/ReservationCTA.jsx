import { Link } from 'react-router-dom'
import './ReservationCTA.css'

export default function ReservationCTA() {
  return (
    <section className="rescta section" aria-label="Make a reservation">
      <div className="rescta__bg">
        <img
          src="/images/gallery/unn1amed.jpg"
          alt="HAWA Rooftop entrance at night"
          className="rescta__bg-image"
          loading="lazy"
        />
        <div className="rescta__overlay" />
      </div>

      <div className="rescta__content container">
        <span className="overline">Your Table Awaits</span>
        <h2 className="rescta__title">Reserve your moment at HAWA.</h2>
        <p className="rescta__subtitle">
          The rooftop is waiting. The breeze is calling. Make tonight unforgettable.
        </p>
        <Link to="/reservations" className="rescta__btn" data-cursor="book">
          Reserve a Table
        </Link>
      </div>
    </section>
  )
}
