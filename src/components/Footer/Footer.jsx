import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'
import siteSettings from '../../data/siteSettings.json'
import './Footer.css'

const navLinks = [
  { label: 'Menu', path: '/menu' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Reservations', path: '/reservations' },
  { label: 'Contact', path: '/contact' },
]

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  )
}

function FacebookIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container container-wide">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">HAWA</Link>
            <p className="footer__tagline">{siteSettings.tagline}</p>
            <p className="footer__desc">{siteSettings.shortDescription}</p>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Navigate</h4>
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} className="footer__link">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Contact</h4>
            <a href={`tel:${siteSettings.phone}`} className="footer__link footer__link--icon">
              <Phone size={14} /> {siteSettings.phone}
            </a>
            <a href={`mailto:${siteSettings.email}`} className="footer__link footer__link--icon">
              <Mail size={14} /> {siteSettings.email}
            </a>
            <span className="footer__link footer__link--icon">
              <MapPin size={14} /> {siteSettings.address.short}
            </span>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Hours</h4>
            <p className="footer__hours">{siteSettings.openingHours.daily}</p>
            <p className="footer__hours-note">Friday: {siteSettings.openingHours.friday}</p>
            <p className="footer__hours-note">{siteSettings.openingHours.note}</p>

            <div className="footer__social">
              <a href={siteSettings.social.instagram} target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
                <InstagramIcon size={18} />
              </a>
              <a href={siteSettings.social.facebook} target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Facebook">
                <FacebookIcon size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">© {new Date().getFullYear()} {siteSettings.fullName}. All rights reserved.</p>
          <p className="footer__credit">Crafted with ♥ for the rooftop experience.</p>
        </div>
      </div>
    </footer>
  )
}
