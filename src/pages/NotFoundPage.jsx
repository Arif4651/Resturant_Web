import { Link } from 'react-router-dom'
import './NotFoundPage.css'

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <div className="container text-center">
        <span className="overline">404 Error</span>
        <h1 className="not-found__title">Looks like this table is empty.</h1>
        <p className="not-found__desc">
          The page you are looking for doesn't exist or has moved above the clouds.
        </p>
        <Link to="/" className="not-found__btn" data-cursor="explore">
          Return to HAWA
        </Link>
      </div>
    </div>
  )
}
