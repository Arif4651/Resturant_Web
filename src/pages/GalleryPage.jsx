import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import galleryData from '../data/galleryData.json'
import SectionHeading from '../components/ui/SectionHeading'
import './GalleryPage.css'

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filteredImages = activeCategory === 'All'
    ? galleryData.images.filter(img => img.isVisible)
    : galleryData.images.filter(img => img.isVisible && img.category === activeCategory)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowLeft') {
        setLightboxIndex(prev => (prev > 0 ? prev - 1 : filteredImages.length - 1))
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex(prev => (prev < filteredImages.length - 1 ? prev + 1 : 0))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, filteredImages.length])

  return (
    <div className="gallery-page">
      <div className="container">
        <SectionHeading
          overline="Visual Portfolio"
          title="The HAWA Gallery"
          subtitle="Immerse yourself in the rooftop atmosphere, artisanal lighting, and unforgettable scenes above the city."
        />

        {/* Category Filters */}
        <div className="gallery-page__filters">
          {galleryData.categories.map(cat => (
            <button
              key={cat}
              className={`gallery-page__filter-btn ${activeCategory === cat ? 'gallery-page__filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Editorial Grid */}
        <div className="gallery-page__grid">
          {filteredImages.map((img, i) => (
            <div
              key={img.id}
              className="gallery-page__card"
              onClick={() => setLightboxIndex(i)}
              data-cursor="view"
            >
              <img src={img.src} alt={img.alt} className="gallery-page__card-img" loading="lazy" />
              <div className="gallery-page__card-overlay">
                <span className="gallery-page__card-category">{img.category}</span>
                <h3 className="gallery-page__card-caption">{img.caption}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="lightbox" role="dialog" aria-label="Image Lightbox">
          <div className="lightbox__backdrop" onClick={() => setLightboxIndex(null)} />
          
          <button className="lightbox__close" onClick={() => setLightboxIndex(null)} aria-label="Close lightbox">
            <X size={28} />
          </button>

          <button
            className="lightbox__nav lightbox__nav--prev"
            onClick={() => setLightboxIndex(prev => (prev > 0 ? prev - 1 : filteredImages.length - 1))}
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>

          <div className="lightbox__content">
            <img
              src={filteredImages[lightboxIndex].src}
              alt={filteredImages[lightboxIndex].alt}
              className="lightbox__img"
            />
            <p className="lightbox__caption">{filteredImages[lightboxIndex].caption}</p>
          </div>

          <button
            className="lightbox__nav lightbox__nav--next"
            onClick={() => setLightboxIndex(prev => (prev < filteredImages.length - 1 ? prev + 1 : 0))}
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </div>
  )
}
