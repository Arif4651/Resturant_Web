import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, MapPin, Film, Image as ImageIcon, Sparkles } from 'lucide-react'
import './Hero.css'

const heroSlides = [
  {
    type: 'video',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-rooftop-restaurant-in-the-city-at-night-42861-large.mp4',
    poster: '/images/hero/hero-poster.jpg',
    label: '4K City Lights'
  },
  {
    type: 'video',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-candles-and-decorations-on-a-restaurant-table-42860-large.mp4',
    poster: '/images/gallery/unn11amed.jpg',
    label: '4K Candlelight'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=90',
    label: '4K Rooftop Evening'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=2000&q=90',
    label: '4K Garden Atmosphere'
  },
  {
    type: 'image',
    src: '/images/gallery/unname8d.jpg',
    label: 'HAWA Daytime'
  },
  {
    type: 'video',
    src: '/video/videoplayback.mp4',
    poster: '/images/hero/hero-poster.jpg',
    label: 'HAWA Original Video'
  }
]

export default function Hero() {
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  const activeSlide = heroSlides[activeSlideIndex]

  useEffect(() => {
    const els = heroRef.current?.querySelectorAll('.hero__animate')
    if (!els) return

    els.forEach((el, i) => {
      el.style.animationDelay = `${0.2 + i * 0.12}s`
    })

    const handleScroll = () => {
      if (!heroRef.current) return
      const scrollY = window.scrollY
      const heroH = heroRef.current.offsetHeight
      if (scrollY < heroH) {
        const progress = scrollY / heroH
        if (videoRef.current) {
          videoRef.current.style.transform = `scale(${1 + progress * 0.05}) translateY(${scrollY * 0.2}px)`
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToContent = () => {
    const nextSection = document.getElementById('experience')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero" ref={heroRef} aria-label="HAWA Rooftop - Hero">
      <div className="hero__media">
        {activeSlide.type === 'video' ? (
          <video
            key={activeSlide.src}
            ref={videoRef}
            className="hero__video"
            autoPlay
            muted
            loop
            playsInline
            poster={activeSlide.poster}
            preload="auto"
          >
            <source src={activeSlide.src} type="video/mp4" />
          </video>
        ) : (
          <img
            key={activeSlide.src}
            src={activeSlide.src}
            alt={activeSlide.label}
            className="hero__image-slide"
          />
        )}
        <div className="hero__overlay" />
      </div>

      <div className="hero__content container">
        <div className="hero__text">
          <h1 className="hero__title hero__animate">
            HAWA
          </h1>
          <p className="hero__subtitle hero__animate">
            Above the city.
          </p>
          <p className="hero__subtitle hero__animate">
            Away from the ordinary.
          </p>
          <p className="hero__description hero__animate">
            Food, breeze and unforgettable rooftop moments in the heart of Mirpur.
          </p>

          <div className="hero__ctas hero__animate">
            <Link to="/menu" className="hero__btn hero__btn--primary" data-cursor="explore">
              Explore Our Menu
            </Link>
            <Link to="/reservations" className="hero__btn hero__btn--secondary" data-cursor="book">
              Reserve a Table
            </Link>
          </div>

          <a
            href="https://www.google.com/maps/search/HAWA+Rooftop+Mirpur+12+Dhaka"
            target="_blank"
            rel="noopener noreferrer"
            className="hero__directions hero__animate"
          >
            <MapPin size={14} />
            <span>Get Directions — Mirpur-12, Dhaka</span>
          </a>
        </div>
      </div>

      {/* Hero Atmosphere Switcher */}
      <div className="hero__slide-switcher" aria-label="Switch hero atmosphere">
        <span className="hero__switcher-tag">
          <Sparkles size={11} /> 4K Media
        </span>
        {heroSlides.map((slide, idx) => (
          <button
            key={idx}
            className={`hero__slide-dot ${activeSlideIndex === idx ? 'hero__slide-dot--active' : ''}`}
            onClick={() => setActiveSlideIndex(idx)}
            title={`Switch to ${slide.label}`}
          >
            {slide.type === 'video' ? <Film size={12} /> : <ImageIcon size={12} />}
            <span className="hero__slide-dot-label">
              {slide.label}
            </span>
          </button>
        ))}
      </div>

      <button className="hero__scroll-indicator" onClick={scrollToContent} aria-label="Scroll to discover HAWA">
        <span className="hero__scroll-text">Discover HAWA</span>
        <ChevronDown size={18} className="hero__scroll-arrow" />
      </button>

      {/* Breeze particles */}
      <div className="hero__breeze" aria-hidden="true">
        <div className="hero__particle hero__particle--1" />
        <div className="hero__particle hero__particle--2" />
        <div className="hero__particle hero__particle--3" />
      </div>
    </section>
  )
}
