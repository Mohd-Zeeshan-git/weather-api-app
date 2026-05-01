import { motion } from 'framer-motion'

export default function FogLayerPro() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute inset-0 bg-white/5 backdrop-blur-sm"
        animate={{ x: ['-10%', '10%', '-10%'] }}
        transition={{ duration: 50, repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-0 bg-white/8 backdrop-blur-md"
        animate={{ x: ['10%', '-10%', '10%'] }}
        transition={{ duration: 70, repeat: Infinity }}
      />
    </div>
  )
}
