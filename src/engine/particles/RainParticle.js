export class RainParticle {
  constructor(width, height, windX) {
    this.reset(width, height, windX)
  }

  reset(width, height, windX) {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.speedY = 400 + Math.random() * 300
    this.speedX = windX * 20
    this.length = 10 + Math.random() * 15
  }

  update(delta, width, height, windX) {
    this.y += this.speedY * (delta / 1000)
    this.x += this.speedX * (delta / 1000)

    if (this.y > height) {
      this.reset(width, 0, windX)
    }
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.strokeStyle = 'rgba(255,255,255,0.4)'
    ctx.lineWidth = 1
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x, this.y + this.length)
    ctx.stroke()
  }
}