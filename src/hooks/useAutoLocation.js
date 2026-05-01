
import { useEffect } from 'react'
export function useAutoLocation(callback){
 useEffect(()=>{
  function fetchLocation(){
   if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(pos=>{
     callback(pos.coords.latitude,pos.coords.longitude)
    })
   }
  }
  fetchLocation()
  const interval=setInterval(fetchLocation, 4*60*60*1000) // 4 hours
  return ()=>clearInterval(interval)
 },[])
}
