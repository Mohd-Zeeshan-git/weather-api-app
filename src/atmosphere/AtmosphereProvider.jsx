import RainLayer from './layers/RainLayer'

export default function AtmosphereProvider({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <RainLayer />
      {children}
    </div>
  )
}