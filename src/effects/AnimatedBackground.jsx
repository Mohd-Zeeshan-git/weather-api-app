import { motion } from 'framer-motion'

export default function AnimatedBackground() {
  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-blue-800 via-indigo-900 to-black"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 40, repeat: Infinity }}
    />
  )
}
