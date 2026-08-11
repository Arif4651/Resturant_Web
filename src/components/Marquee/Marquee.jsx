import './Marquee.css'

const items = [
  'ROOFTOP DINING', 'CITY LIGHTS', 'GOOD FOOD', 'OPEN SKY',
  'MEMORABLE MOMENTS', 'HAWA', 'SUNSET BREEZE', 'NATURE',
  'CELEBRATIONS', 'ROMANCE'
]

export default function Marquee() {
  const content = items.map(item => `${item} ✦`).join(' ')

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        <span className="marquee__content">{content} </span>
        <span className="marquee__content">{content} </span>
      </div>
    </div>
  )
}
