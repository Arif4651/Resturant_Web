import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Flame, Star, Leaf } from 'lucide-react'
import menuData from '../../data/menuData.json'
import MenuItemModal from '../MenuItemModal/MenuItemModal'
import SectionHeading from '../ui/SectionHeading'
import './SignatureDishes.css'

const formatPrice = (price) => `৳${price.toLocaleString()}`

export default function SignatureDishes() {
  const gridRef = useRef(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const featured = menuData.items.filter(item => item.isFeatured).slice(0, 8)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('sig--visible')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    if (gridRef.current) observer.observe(gridRef.current)
    return () => observer.disconnect()
  }, [])

  const getCategoryName = (catId) => {
    const cat = menuData.categories.find(c => c.id === catId)
    return cat ? cat.name : ''
  }

  return (
    <section className="sig section">
      <div className="container">
        <SectionHeading
          overline="Signature Flavours"
          title="Crafted to be remembered."
          subtitle="From our rooftop kitchen to your table — dishes that define the HAWA experience."
        />

        <div className="sig__grid" ref={gridRef}>
          {featured.map((dish, i) => (
            <div
              className="sig__card"
              key={dish.id}
              onClick={() => setSelectedItem(dish)}
              style={{ animationDelay: `${i * 0.08}s` }}
              data-cursor="explore"
            >
              <div className="sig__card-image-wrap">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="sig__card-img"
                  loading="lazy"
                />
                <div className="sig__card-badges">
                  {dish.isPopular && (
                    <span className="sig__badge sig__badge--popular">
                      <Star size={10} /> Popular
                    </span>
                  )}
                  {dish.isSpicy && (
                    <span className="sig__badge sig__badge--spicy">
                      <Flame size={10} /> Spicy
                    </span>
                  )}
                  {dish.isVegetarian && (
                    <span className="sig__badge sig__badge--veg">
                      <Leaf size={10} /> Veg
                    </span>
                  )}
                </div>
              </div>

              <div className="sig__card-body">
                <span className="sig__card-category">{getCategoryName(dish.categoryId)}</span>
                <h3 className="sig__card-name">{dish.name}</h3>
                {dish.servingSize && (
                  <span className="sig__card-serving">{dish.servingSize}</span>
                )}
                <div className="sig__card-price-row">
                  <span className="sig__card-price">{formatPrice(dish.price)}</span>
                  {dish.priceL && (
                    <span className="sig__card-price-l">L: {formatPrice(dish.priceL)}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sig__cta-wrap">
          <Link to="/menu" className="sig__cta" data-cursor="explore">
            View Full Menu
          </Link>
        </div>
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <MenuItemModal
          item={selectedItem}
          categoryName={getCategoryName(selectedItem.categoryId)}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </section>
  )
}
