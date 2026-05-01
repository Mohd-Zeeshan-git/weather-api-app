import { useEffect, useRef } from 'react'

export default function SnowParticles({ wind }) {
  const ref = useRef()

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const flakes = Array.from({ length: 200 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1
    }))

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "white"

      flakes.forEach(f => {
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
        ctx.fill()

        f.y += 1 + wind.windSpeed * 0.1
        f.x += Math.cos((wind.windDeg * Math.PI) / 180)

        if (f.y > canvas.height) f.y = 0
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [wind])

  return <canvas ref={ref} className="absolute inset-0 pointer-events-none" />
}
