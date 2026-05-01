export default function RainLayer() {
  const drops = Array.from({ length: 60 })

  return (
    <div className="absolute inset-0 pointer-events-none">
      {drops.map((_, i) => (
        <div
          key={i}
          className="absolute w-[2px] h-10 bg-white/20 animate-rain"
          style={{ left: Math.random() * 100 + '%' }}
        />
      ))}
    </div>
  )
}