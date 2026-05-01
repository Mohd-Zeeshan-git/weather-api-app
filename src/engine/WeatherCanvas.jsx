import { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAnimationLoop } from './core/useAnimationLoop'
import { RainParticle } from './particles/RainParticle'

export default function WeatherCanvas() {
  const canvasRef = useRef()
  const particlesRef = useRef([])
  const { windSpeed, windDeg, condition } = useSelector(s => s.weather)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const width = canvas.width = window.innerWidth
    const height = canvas.height = window.innerHeight

    const radians = windDeg * Math.PI / 180
    const windX = Math.cos(radians) * windSpeed

    particlesRef.current = Array.from({ length: 200 }).map(
      () => new RainParticle(width, height, windX)
    )

  }, [windSpeed, windDeg])

  useAnimationLoop((delta) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    ctx.clearRect(0, 0, width, height)

    const radians = windDeg * Math.PI / 180
    const windX = Math.cos(radians) * windSpeed

    particlesRef.current.forEach(p => {
      p.update(delta, width, height, windX)
      p.draw(ctx)
    })
  })

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
    />
  )
}