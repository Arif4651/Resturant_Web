import { useState, useMemo } from 'react'
import { Search, Flame, Star, Leaf, Sparkles } from 'lucide-react'
import menuData from '../data/menuData.json'
import MenuItemModal from '../components/MenuItemModal/MenuItemModal'
import SectionHeading from '../components/ui/SectionHeading'
import './MenuPage.css'

const formatPrice = (price) => `৳${price.toLocaleString()}`

const quickFilterTabs = [
  { id: 'all', label: 'All Dishes' },
  { id: 'chicken', label: 'Chicken' },
  { id: 'beef-mutton', label: 'Beef / Mutton' },
  { id: 'fish', label: 'Fish & Seafood' },
  { id: 'veg', label: 'Vegetarian' },
  { id: 'drinks', label: 'Beverages' },
  { id: 'dessert', label: 'Desserts' },
]

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeQuickFilter, setActiveQuickFilter] = useState('all')
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)

  // Filter items
  const filteredItems = useMemo(() => {
    return menuData.items.filter(item => {
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch = !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.price.toString().includes(query)

      const matchesCategory = activeCategory === 'all' || item.categoryId === activeCategory

      let matchesQuick = true
      if (activeQuickFilter === 'chicken') {
        matchesQuick = item.categoryId === 'chicken-curry' || item.name.toLowerCase().includes('chicken')
      } else if (activeQuickFilter === 'beef-mutton') {
        matchesQuick = item.categoryId === 'beef-mutton-curry' || item.name.toLowerCase().includes('beef') || item.name.toLowerCase().includes('mutton')
      } else if (activeQuickFilter === 'fish') {
        matchesQuick = item.categoryId === 'fish-curry' || item.categoryId === 'fish-bbq' || item.name.toLowerCase().includes('fish') || item.name.toLowerCase().includes('prawn') || item.name.toLowerCase().includes('koral')
      } else if (activeQuickFilter === 'veg') {
        matchesQuick = item.isVegetarian || item.categoryId === 'vegetable' || item.categoryId === 'salad'
      } else if (activeQuickFilter === 'drinks') {
        matchesQuick = ['mocktail', 'coffee', 'milkshake', 'juice', 'drinks'].includes(item.categoryId)
      } else if (activeQuickFilter === 'dessert') {
        matchesQuick = item.categoryId === 'dessert'
      }

      return matchesSearch && matchesCategory && matchesQuick
    })
  }, [searchQuery, activeCategory, activeQuickFilter])

  // Group filtered items by category
  const groupedItems = useMemo(() => {
    const groups = {}
    filteredItems.forEach(item => {
      if (!groups[item.categoryId]) {
        groups[item.categoryId] = []
      }
      groups[item.categoryId].push(item)
    })
    return groups
  }, [filteredItems])

  const getCategory = (catId) => menuData.categories.find(c => c.id === catId)

  return (
    <div className="menu-page">
      {/* Header Banner */}
      <div className="menu-page__hero">
        <div className="container">
          <SectionHeading
            overline="The Culinary Collection"
            title="Our Digital Menu"
            subtitle="Explore our full selection of freshly prepared dishes, refreshing drinks, and rooftop specialties."
          />

          {/* Search Bar */}
          <div className="menu-page__search-wrap">
            <Search className="menu-page__search-icon" size={20} />
            <input
              type="text"
              placeholder="Search dishes by name, ingredient, or price..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="menu-page__search-input"
            />
            {searchQuery && (
              <button className="menu-page__search-clear" onClick={() => setSearchQuery('')}>
                Clear
              </button>
            )}
          </div>

          {/* Quick Dietary Filters */}
          <div className="menu-page__quick-filters">
            {quickFilterTabs.map(tab => (
              <button
                key={tab.id}
                className={`menu-page__quick-tab ${activeQuickFilter === tab.id ? 'menu-page__quick-tab--active' : ''}`}
                onClick={() => {
                  setActiveQuickFilter(tab.id)
                  setActiveCategory('all')
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Menu Area */}
      <div className="container container-wide menu-page__main">
        {/* Category Navigation Sidebar */}
        <aside className="menu-page__sidebar">
          <div className="menu-page__sidebar-inner">
            <span className="menu-page__sidebar-title">Categories</span>
            <button
              className={`menu-page__cat-btn ${activeCategory === 'all' ? 'menu-page__cat-btn--active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Categories
            </button>
            {menuData.categories.map(cat => (
              <button
                key={cat.id}
                className={`menu-page__cat-btn ${activeCategory === cat.id ? 'menu-page__cat-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </aside>

        {/* Dish List */}
        <div className="menu-page__content">
          {Object.keys(groupedItems).length === 0 ? (
            <div className="menu-page__empty">
              <p className="menu-page__empty-title">No dishes found</p>
              <p className="menu-page__empty-desc">Try clearing your search or switching filters.</p>
              <button
                className="menu-page__empty-btn"
                onClick={() => {
                  setSearchQuery('')
                  setActiveCategory('all')
                  setActiveQuickFilter('all')
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            Object.keys(groupedItems).map(catId => {
              const category = getCategory(catId)
              const items = groupedItems[catId]
              if (!category || items.length === 0) return null

              return (
                <div key={catId} className="menu-page__section" id={`cat-${catId}`}>
                  <h3 className="menu-page__section-title">{category.name}</h3>
                  <div className="menu-page__grid">
                    {items.map(item => (
                      <div
                        key={item.id}
                        className="menu-page__item-card"
                        onClick={() => setSelectedItem(item)}
                        data-cursor="explore"
                      >
                        {/* Food Image Thumbnail */}
                        <div className="menu-page__item-thumb-wrap">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="menu-page__item-thumb"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>

                        {/* Dish Information */}
                        <div className="menu-page__item-info">
                          <div className="menu-page__item-title-row">
                            <h4 className="menu-page__item-name">{item.name}</h4>
                            <div className="menu-page__item-badges">
                              {item.isPopular && <Star size={12} className="icon-popular" title="Popular" />}
                              {item.isSpicy && <Flame size={12} className="icon-spicy" title="Spicy" />}
                              {item.isVegetarian && <Leaf size={12} className="icon-veg" title="Vegetarian" />}
                              {item.isChefChoice && <Sparkles size={12} className="icon-chef" title="Chef's Choice" />}
                            </div>
                          </div>

                          {item.servingSize && (
                            <span className="menu-page__item-serving">{item.servingSize}</span>
                          )}

                          {item.description && (
                            <p className="menu-page__item-desc">{item.description}</p>
                          )}

                          <div className="menu-page__item-footer">
                            <div className="menu-page__item-price-wrap">
                              <span className="menu-page__item-price">{formatPrice(item.price)}</span>
                              {item.priceL && (
                                <span className="menu-page__item-price-l">L: {formatPrice(item.priceL)}</span>
                              )}
                            </div>
                            <span className="menu-page__item-cta">View Detail →</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <MenuItemModal
          item={selectedItem}
          categoryName={getCategory(selectedItem.categoryId)?.name || ''}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  )
}
