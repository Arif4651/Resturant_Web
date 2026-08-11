import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import FloatingActionBar from './components/FloatingActionBar/FloatingActionBar'
import CustomCursor from './components/CustomCursor/CustomCursor'
import Loader from './components/ui/Loader'

const HomePage = lazy(() => import('./pages/HomePage'))
const MenuPage = lazy(() => import('./pages/MenuPage'))
const GalleryPage = lazy(() => import('./pages/GalleryPage'))
const ReservationPage = lazy(() => import('./pages/ReservationPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <ThemeProvider>
      <CustomCursor />
      <Navbar />
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/reservations" element={<ReservationPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </Suspense>
      <Footer />
      <FloatingActionBar />
    </ThemeProvider>
  )
}

export default App
