
import { useEffect, useRef } from 'react'

export default function CinematicEngine({ condition }){
 const canvasRef = useRef()

 useEffect(()=>{
  const canvas = canvasRef.current
  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const wind = { x: 0.8, y: 1 }
  const particles=[]

  for(let i=0;i<250;i++){
   particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    size:Math.random()*2+1,
    velX:wind.x*Math.random(),
    velY:wind.y*(Math.random()*3+1),
    alpha:Math.random()
   })
  }

  function draw(){
   ctx.clearRect(0,0,canvas.width,canvas.height)
   particles.forEach(p=>{
    ctx.globalAlpha=p.alpha
    ctx.fillStyle=condition.includes('Snow')?'white':'#7dd3fc'
    ctx.beginPath()
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2)
    ctx.fill()

    p.x+=p.velX
    p.y+=p.velY

    if(p.y>canvas.height){
      p.y=0
      p.x=Math.random()*canvas.width
    }
   })
   ctx.globalAlpha=1
   requestAnimationFrame(draw)
  }

  draw()
 },[condition])

 return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none"/>
}
