import { useEffect, useRef, useState } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const labelRef = useRef(null)
  const [label, setLabel] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [visible, setVisible] = useState(false)
  const isUsingTouch = useRef(false)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = -100, mouseY = -100
    let cursorX = -100, cursorY = -100

    const handleMouseMove = (e) => {
      if (isUsingTouch.current) return
      mouseX = e.clientX
      mouseY = e.clientY
      if (!visible) setVisible(true)
    }

    const handleTouchStart = () => {
      isUsingTouch.current = true
      setVisible(false)
    }

    const handleMouseOver = (e) => {
      if (isUsingTouch.current) return
      const target = e.target.closest('[data-cursor]')
      const interactive = e.target.closest('a, button, [role="button"], input, select, textarea')
      
      if (target) {
        setLabel(target.getAttribute('data-cursor') || '')
        setExpanded(true)
      } else if (interactive) {
        setExpanded(true)
        setLabel('')
      } else {
        setExpanded(false)
        setLabel('')
      }
    }

    const handleMouseLeave = () => {
      setVisible(false)
    }

    let rafId
    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.2
      cursorY += (mouseY - cursorY) * 0.2
      if (cursor) {
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`
      }
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafId)
    }
  }, [visible])

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${expanded ? 'custom-cursor--expanded' : ''} ${visible ? 'custom-cursor--visible' : ''} ${label ? 'custom-cursor--labeled' : ''}`}
      aria-hidden="true"
    >
      <span ref={labelRef} className="custom-cursor__label">{label}</span>
    </div>
  )
}
