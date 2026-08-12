import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Flame, Star, Leaf, Sparkles, Calendar } from 'lucide-react'
import './MenuItemModal.css'

const formatPrice = (price) => `৳${price.toLocaleString()}`

export default function MenuItemModal({ item, categoryName, onClose }) {
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)

    // Plain `overflow: hidden` on body doesn't reliably block background
    // scroll on iOS Safari, letting the page scroll underneath the fixed
    // modal. Pinning the body in place at its current scroll offset does.
    const scrollY = window.scrollY
    const { body } = document
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      body.style.position = ''
      body.style.top = ''
      body.style.left = ''
      body.style.right = ''
      window.scrollTo(0, scrollY)
    }
  }, [onClose])

  if (!item) return null

  const handleReserve = () => {
    onClose()
    navigate('/reservations')
  }

  return (
    <div className="menu-modal" role="dialog" aria-modal="true" aria-labelledby="modal-dish-name">
      <div className="menu-modal__backdrop" onClick={onClose} />
      <div className="menu-modal__content">
        <button className="menu-modal__close" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>

        {/* Food Header Image */}
        <div className="menu-modal__header-img-wrap">
          <img
            src={item.image}
            alt={item.name}
            className="menu-modal__header-img"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className="menu-modal__header-overlay" />
          <div className="menu-modal__badges">
            {item.isPopular && (
              <span className="menu-modal__badge menu-modal__badge--popular">
                <Star size={12} /> Popular
              </span>
            )}
            {item.isSpicy && (
              <span className="menu-modal__badge menu-modal__badge--spicy">
                <Flame size={12} /> Spicy
              </span>
            )}
            {item.isVegetarian && (
              <span className="menu-modal__badge menu-modal__badge--veg">
                <Leaf size={12} /> Veg
              </span>
            )}
            {item.isChefChoice && (
              <span className="menu-modal__badge menu-modal__badge--chef">
                <Sparkles size={12} /> Chef's Choice
              </span>
            )}
          </div>
        </div>

        <div className="menu-modal__body">
          <span className="menu-modal__category">{categoryName}</span>
          <h2 id="modal-dish-name" className="menu-modal__title">{item.name}</h2>
          
          {item.servingSize && (
            <span className="menu-modal__serving">Serving size: {item.servingSize}</span>
          )}

          <p className="menu-modal__description">
            {item.description || 'Prepared fresh in our rooftop kitchen using authentic ingredients, herbs, and house-made spices.'}
          </p>

          <div className="menu-modal__price-box">
            <div>
              <span className="menu-modal__price-label">Price</span>
              <div className="menu-modal__prices">
                <span className="menu-modal__price">{formatPrice(item.price)}</span>
                {item.priceL && (
                  <span className="menu-modal__price-l">Large: {formatPrice(item.priceL)}</span>
                )}
              </div>
            </div>

            <button className="menu-modal__btn-reserve" onClick={handleReserve}>
              <Calendar size={14} style={{ marginRight: '4px' }} />
              Reserve a Table
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
