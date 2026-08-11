import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import './MobileNav.css'

export default function MobileNav({ isOpen, onClose, links }) {
  const navRef = useRef(null)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <div
      className={`mobile-nav ${isOpen ? 'mobile-nav--open' : ''}`}
      ref={navRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <div className="mobile-nav__backdrop" onClick={onClose} />
      
      <div className="mobile-nav__panel">
        <div className="mobile-nav__header">
          <span className="mobile-nav__logo">HAWA</span>
          <button
            className="mobile-nav__theme-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            <span>{theme === 'dark' ? 'Day Mode' : 'Night Mode'}</span>
          </button>
          <button
            className="mobile-nav__close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={28} strokeWidth={1.5} />
          </button>
        </div>

        <nav className="mobile-nav__links">
          {links.map((link, i) => (
            <Link
              key={link.path}
              to={link.path.startsWith('/#') ? '/' : link.path}
              className="mobile-nav__link"
              onClick={onClose}
              style={{ animationDelay: `${(i + 1) * 0.06}s` }}
            >
              <span className="mobile-nav__link-number">0{i + 1}</span>
              <span className="mobile-nav__link-text">{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mobile-nav__footer">
          <Link to="/reservations" className="mobile-nav__cta" onClick={onClose}>
            Reserve a Table
          </Link>
          <div className="mobile-nav__contact">
            <p className="mobile-nav__info">Mirpur-12, Dhaka</p>
            <p className="mobile-nav__info">Beside Pallabi Metro Station</p>
          </div>
        </div>
      </div>
    </div>
  )
}
