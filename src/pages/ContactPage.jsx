import Location from '../components/Location/Location'
import SectionHeading from '../components/ui/SectionHeading'
import siteSettings from '../data/siteSettings.json'
import './ContactPage.css'

export default function ContactPage() {
  return (
    <div className="contact-page">
      <div className="container">
        <SectionHeading
          overline="Get In Touch"
          title="Contact HAWA"
          subtitle="Whether you have a question about our menu, need help planning a special event, or want directions — we're here to help."
        />
      </div>

      <Location />

      <div className="container container-narrow contact-page__extra">
        <div className="contact-page__card">
          <h3 className="contact-page__card-title">Private Events & Group Dining</h3>
          <p className="contact-page__card-desc">
            Planning a birthday, anniversary, corporate dinner, or private rooftop gathering? Contact our team for customized menu arrangements and private seating reservations.
          </p>
          <a href={`tel:${siteSettings.phone}`} className="contact-page__card-btn">
            Call Event Manager
          </a>
        </div>
      </div>
    </div>
  )
}
