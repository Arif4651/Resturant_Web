import { ExternalLink } from 'lucide-react'
import siteSettings from '../../data/siteSettings.json'
import SectionHeading from '../ui/SectionHeading'
import './SocialMoments.css'

function InstagramIcon({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  )
}

const socialPosts = [
  {
    id: 1,
    image: '/images/gallery/unnamed9.jpg',
    caption: 'Sunset vibes on the rooftop boat 🌅✨ #hawarooftop #dhakadiaries',
    link: siteSettings.social.instagram
  },
  {
    id: 2,
    image: '/images/gallery/unn1amed.jpg',
    caption: 'When night falls, the magic begins 🌌 #rooftopdining #nightlife',
    link: siteSettings.social.instagram
  },
  {
    id: 3,
    image: '/images/gallery/unna77med.jpg',
    caption: 'Details that create the mood ✨ #interiordesign #hospitality',
    link: siteSettings.social.instagram
  },
  {
    id: 4,
    image: '/images/gallery/unname8d.jpg',
    caption: 'Breeze, food, and endless skies 🌿 #mirpur #hawarooftop',
    link: siteSettings.social.instagram
  }
]

export default function SocialMoments() {
  return (
    <section className="social section" aria-label="Social Media Moments">
      <div className="container">
        <SectionHeading
          overline="Social Gallery"
          title="Moments from HAWA"
          subtitle="Tag @hawarooftopbd on Instagram to be featured on our rooftop feed."
        />

        <div className="social__grid">
          {socialPosts.map(post => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="social__card"
              data-cursor="view"
            >
              <img src={post.image} alt="Social post moment" className="social__card-img" loading="lazy" />
              <div className="social__card-overlay">
                <InstagramIcon size={24} className="social__card-icon" />
                <p className="social__card-caption">{post.caption}</p>
                <span className="social__card-link-text">
                  View on Instagram <ExternalLink size={12} />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="social__cta-wrap">
          <a
            href={siteSettings.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="social__cta"
          >
            <InstagramIcon size={18} />
            Follow {siteSettings.social.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  )
}
