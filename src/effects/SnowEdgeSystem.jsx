import { useEffect, useRef } from 'react'

export default function SnowEdgeSystem({ active }) {
  const ref = useRef()

  useEffect(() => {
    if (!active) return
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const edge = new Array(canvas.width).fill(0)

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "white"

      for (let i = 0; i < edge.length; i += 5) {
        if (Math.random() > 0.97) edge[i] += 1
        ctx.fillRect(i, canvas.height - edge[i], 2, edge[i])
      }

      requestAnimationFrame(animate)
    }

    animate()
  }, [active])

  return <canvas ref={ref} className="absolute inset-0 pointer-events-none" />
}
