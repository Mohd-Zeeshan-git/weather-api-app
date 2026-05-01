import { useEffect, useRef } from 'react'

export default function AAAEngine({ condition }) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1

    function resizeCanvas() {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 🔥 Performance scaling based on device
    const particleCount =
      window.innerWidth < 768 ? 90 : 180

    const wind = { x: 0.5, y: 1 }

    function createParticles() {
      particlesRef.current = []
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 1,
          velX: wind.x * Math.random(),
          velY: wind.y * (Math.random() * 3 + 1),
        })
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((p) => {
        // ❄ Snow vs 🌧 Rain color
        ctx.fillStyle = condition?.includes('Snow')
          ? 'white'
          : 'rgba(173,216,230,0.7)'

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        p.x += p.velX
        p.y += p.velY

        if (p.y > window.innerHeight) {
          p.y = 0
          p.x = Math.random() * window.innerWidth
        }
      })

      animationRef.current = requestAnimationFrame(draw)
    }

    createParticles()
    draw()

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [condition])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}