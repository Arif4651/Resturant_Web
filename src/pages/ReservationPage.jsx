import { useState } from 'react'
import { Calendar, Clock, Users, Sparkles, CheckCircle2 } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import siteSettings from '../data/siteSettings.json'
import './ReservationPage.css'

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '2',
    date: '',
    time: '19:00',
    seating: 'Rooftop / Outdoor',
    occasion: 'Regular dining',
    specialRequest: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate submission
    setSubmitted(true)
  }

  return (
    <div className="res-page">
      <div className="container container-narrow">
        <SectionHeading
          overline="Table Reservations"
          title="Reserve Your Moment"
          subtitle="Join us above the city for food, breeze, and memorable rooftop dining."
        />

        {submitted ? (
          <div className="res-page__success">
            <CheckCircle2 size={64} className="res-page__success-icon" />
            <h2 className="res-page__success-title">Your table request is on its way</h2>
            <p className="res-page__success-desc">
              Thank you, <strong>{formData.name}</strong>. Our team will contact you shortly at <strong>{formData.phone}</strong> to confirm your reservation for {formData.guests} guests on {formData.date || 'your selected date'}.
            </p>
            <div className="res-page__success-details">
              <span><strong>Seating:</strong> {formData.seating}</span>
              <span><strong>Occasion:</strong> {formData.occasion}</span>
            </div>
            <p className="res-page__success-note">
              Please note: Reservations are subject to confirmation by restaurant staff. For urgent requests, call us directly at <a href={`tel:${siteSettings.phone}`}>{siteSettings.phone}</a>.
            </p>
            <button
              className="res-page__success-btn"
              onClick={() => {
                setSubmitted(false)
                setFormData({
                  name: '', phone: '', email: '', guests: '2',
                  date: '', time: '19:00', seating: 'Rooftop / Outdoor',
                  occasion: 'Regular dining', specialRequest: ''
                })
              }}
            >
              Make Another Reservation
            </button>
          </div>
        ) : (
          <form className="res-page__form" onSubmit={handleSubmit}>
            <div className="res-page__form-grid">
              {/* Name */}
              <div className="res-page__field">
                <label htmlFor="name" className="res-page__label">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="e.g. Tanvir Ahmed"
                  value={formData.name}
                  onChange={handleChange}
                  className="res-page__input"
                />
              </div>

              {/* Phone */}
              <div className="res-page__field">
                <label htmlFor="phone" className="res-page__label">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  placeholder="e.g. 01700-000000"
                  value={formData.phone}
                  onChange={handleChange}
                  className="res-page__input"
                />
              </div>

              {/* Email */}
              <div className="res-page__field">
                <label htmlFor="email" className="res-page__label">Email (Optional)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="e.g. name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="res-page__input"
                />
              </div>

              {/* Guests */}
              <div className="res-page__field">
                <label htmlFor="guests" className="res-page__label">Number of Guests *</label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="res-page__select"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons (Couple)</option>
                  <option value="3">3 Persons</option>
                  <option value="4">4 Persons</option>
                  <option value="5">5 Persons</option>
                  <option value="6">6 Persons</option>
                  <option value="8+">8+ Persons (Group)</option>
                </select>
              </div>

              {/* Date */}
              <div className="res-page__field">
                <label htmlFor="date" className="res-page__label">Preferred Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="res-page__input"
                />
              </div>

              {/* Time */}
              <div className="res-page__field">
                <label htmlFor="time" className="res-page__label">Preferred Time *</label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="res-page__select"
                >
                  <option value="13:00">1:00 PM (Lunch)</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="17:00">5:00 PM (Sunset)</option>
                  <option value="18:30">6:30 PM (Sunset/Evening)</option>
                  <option value="19:30">7:30 PM (Dinner Peak)</option>
                  <option value="20:30">8:30 PM (Dinner)</option>
                  <option value="21:30">9:30 PM (Late Dinner)</option>
                </select>
              </div>

              {/* Seating Preference */}
              <div className="res-page__field">
                <label htmlFor="seating" className="res-page__label">Seating Preference</label>
                <select
                  id="seating"
                  name="seating"
                  value={formData.seating}
                  onChange={handleChange}
                  className="res-page__select"
                >
                  <option value="Rooftop / Outdoor">Rooftop / Outdoor (Recommended)</option>
                  <option value="Indoor">Indoor (Air-Conditioned)</option>
                  <option value="No preference">No preference</option>
                </select>
              </div>

              {/* Occasion */}
              <div className="res-page__field">
                <label htmlFor="occasion" className="res-page__label">Occasion</label>
                <select
                  id="occasion"
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                  className="res-page__select"
                >
                  <option value="Regular dining">Regular dining</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Family gathering">Family gathering</option>
                  <option value="Corporate gathering">Corporate gathering</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Special Request */}
              <div className="res-page__field res-page__field--full">
                <label htmlFor="specialRequest" className="res-page__label">Special Request</label>
                <textarea
                  id="specialRequest"
                  name="specialRequest"
                  rows="3"
                  placeholder="e.g. Quiet corner table, decoration request, dietary needs..."
                  value={formData.specialRequest}
                  onChange={handleChange}
                  className="res-page__textarea"
                />
              </div>
            </div>

            <button type="submit" className="res-page__submit" data-cursor="book">
              Request Table Reservation
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
