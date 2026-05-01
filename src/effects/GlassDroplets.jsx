import { useEffect, useRef } from 'react'

export default function GlassDroplets({ active }) {
  const ref = useRef()

  useEffect(() => {
    if (!active) return
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const drops = []

    setInterval(() => {
      drops.push({
        x: Math.random() * canvas.width,
        y: 0,
        r: 3 + Math.random() * 4
      })
    }, 800)

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      drops.forEach(d => {
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255,255,255,0.2)"
        ctx.fill()
        d.y += 1
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [active])

  return <canvas ref={ref} className="absolute inset-0 pointer-events-none" />
}
