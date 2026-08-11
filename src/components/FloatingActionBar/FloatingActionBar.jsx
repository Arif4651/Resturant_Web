import { Phone, Navigation, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import siteSettings from '../../data/siteSettings.json'
import './FloatingActionBar.css'

export default function FloatingActionBar() {
  return (
    <div className="fab" role="navigation" aria-label="Quick actions">
      <a href={`tel:${siteSettings.phone}`} className="fab__btn">
        <Phone size={18} />
        <span className="fab__label">Call</span>
      </a>
      <a
        href={siteSettings.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fab__btn"
      >
        <Navigation size={18} />
        <span className="fab__label">Directions</span>
      </a>
      <Link to="/reservations" className="fab__btn fab__btn--primary">
        <Calendar size={18} />
        <span className="fab__label">Reserve</span>
      </Link>
    </div>
  )
}
