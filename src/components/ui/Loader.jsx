import './Loader.css'

export default function Loader() {
  return (
    <div className="loader" role="status" aria-label="Loading">
      <div className="loader__content">
        <span className="loader__brand">HAWA</span>
        <div className="loader__bar">
          <div className="loader__bar-fill" />
        </div>
      </div>
    </div>
  )
}
