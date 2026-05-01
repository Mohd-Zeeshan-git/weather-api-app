import { useEffect, useRef } from 'react'

export function useAnimationLoop(callback) {
  const frameRef = useRef()

  useEffect(() => {
    let last = performance.now()

    const loop = (time) => {
      const delta = time - last
      last = time
      callback(delta)
      frameRef.current = requestAnimationFrame(loop)
    }

    frameRef.current = requestAnimationFrame(loop)

    return () => cancelAnimationFrame(frameRef.current)
  }, [callback])
}