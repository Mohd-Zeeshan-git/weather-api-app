import RainLayer from '../atmosphere/layers/RainLayer'
import FogLayerPro from '../effects/FogLayerPro'
import SnowParticles from '../effects/SnowParticles'
import AAAEngine from './AAAEngine'

export default function WeatherEngine({ condition }) {
  if (!condition) return null

  if (condition.includes('Snow')) {
    return <SnowParticles />
  }

  if (condition.includes('Rain') || condition.includes('Drizzle')) {
    return <RainLayer />
  }

  if (condition.includes('Fog') || condition.includes('Mist')) {
    return <FogLayerPro />
  }

  return <AAAEngine condition={condition} />
}