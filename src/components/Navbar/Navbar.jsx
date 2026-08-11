import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import MobileNav from '../MobileNav/MobileNav'
import './Navbar.css'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Our Story', path: '/#experience' },
  { label: 'Menu', path: '/menu' },
  { label: 'Experience', path: '/#rooftop' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Reviews', path: '/#reviews' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = (e, path) => {
    if (path.startsWith('/#')) {
      e.preventDefault()
      const id = path.replace('/#', '')
      if (location.pathname === '/') {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.location.href = path
      }
    }
  }

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
        <div className="navbar__inner container container-wide">
          <Link to="/" className="navbar__logo" aria-label="HAWA Rooftop - Home">
            <span className="navbar__logo-text">HAWA</span>
          </Link>

          <nav className="navbar__nav" role="navigation" aria-label="Main navigation">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
                onClick={(e) => handleNavClick(e, link.path)}
              >
                {link.label}
                <span className="navbar__link-line" />
              </Link>
            ))}
          </nav>

          <div className="navbar__actions">
            {/* Day / Night Atmosphere Toggle Button */}
            <button
              className="navbar__theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'Day Atmosphere' : 'Night Atmosphere'}`}
              title={`Switch to ${theme === 'dark' ? 'Day Atmosphere (Light)' : 'Night Atmosphere (Dark)'}`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              <span className="navbar__theme-label">{theme === 'dark' ? 'Day' : 'Night'}</span>
            </button>

            <Link to="/reservations" className="navbar__cta" data-cursor="book">
              Reserve a Table
            </Link>

            <button
              className="navbar__hamburger"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />
    </>
  )
}
