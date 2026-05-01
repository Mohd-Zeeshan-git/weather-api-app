
import { useEffect, useRef } from 'react'

export default function AtmosphericEngine({ condition }){
 const canvasRef = useRef()

 useEffect(()=>{
  const canvas = canvasRef.current
  const ctx = canvas.getContext('2d')
  let particles=[]
  let animationFrame

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  function createParticles(){
   particles=[]
   for(let i=0;i<120;i++){
    particles.push({
     x: Math.random()*canvas.width,
     y: Math.random()*canvas.height,
     size: Math.random()*3+1,
     speedY: condition?.includes('Rain')?Math.random()*4+2:Math.random()*1+0.5,
     speedX: Math.random()*0.5
    })
   }
  }

  function draw(){
   ctx.clearRect(0,0,canvas.width,canvas.height)
   ctx.fillStyle = condition?.includes('Snow')?'white':'rgba(173,216,230,0.7)'
   particles.forEach(p=>{
    ctx.beginPath()
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2)
    ctx.fill()
    p.y += p.speedY
    p.x += p.speedX
    if(p.y>canvas.height){ p.y=0; p.x=Math.random()*canvas.width }
   })
   animationFrame=requestAnimationFrame(draw)
  }

  createParticles()
  draw()

  return ()=>cancelAnimationFrame(animationFrame)

 },[condition])

 return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0"/>
}
