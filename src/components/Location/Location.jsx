import { MapPin, Phone, Clock, Navigation } from 'lucide-react'
import siteSettings from '../../data/siteSettings.json'
import SectionHeading from '../ui/SectionHeading'
import './Location.css'

export default function Location() {
  return (
    <section className="loc section" id="location">
      <div className="container">
        <SectionHeading
          overline="Find Us"
          title="Visit HAWA."
          subtitle="We're in the heart of Mirpur, just beside Pallabi Metro Station."
        />

        <div className="loc__grid">
          <div className="loc__map-wrap">
            <iframe
              src={siteSettings.googleMapsEmbed}
              className="loc__map"
              title="HAWA Rooftop Location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="loc__info">
            <div className="loc__info-item">
              <MapPin size={20} className="loc__icon" />
              <div>
                <h4 className="loc__info-label">Address</h4>
                <p className="loc__info-value">{siteSettings.address.full}</p>
                <p className="loc__info-sub">{siteSettings.address.landmark}</p>
              </div>
            </div>

            <div className="loc__info-item">
              <Clock size={20} className="loc__icon" />
              <div>
                <h4 className="loc__info-label">Opening Hours</h4>
                <p className="loc__info-value">{siteSettings.openingHours.daily}</p>
                <p className="loc__info-sub">Friday: {siteSettings.openingHours.friday}</p>
                <p className="loc__info-sub">{siteSettings.openingHours.note}</p>
              </div>
            </div>

            <div className="loc__info-item">
              <Phone size={20} className="loc__icon" />
              <div>
                <h4 className="loc__info-label">Call Us</h4>
                <a href={`tel:${siteSettings.phone}`} className="loc__info-value loc__info-link">
                  {siteSettings.phone}
                </a>
              </div>
            </div>

            <div className="loc__actions">
              <a
                href={siteSettings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="loc__btn"
              >
                <Navigation size={16} />
                Get Directions
              </a>
              <a href={`tel:${siteSettings.phone}`} className="loc__btn loc__btn--outline">
                <Phone size={16} />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
