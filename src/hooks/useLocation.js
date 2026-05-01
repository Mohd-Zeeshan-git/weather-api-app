
import { useEffect } from 'react'

export function useLocation(callback){
  useEffect(()=>{
    if(!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(pos=>{
      callback(pos.coords.latitude,pos.coords.longitude)
    })
  },[])
}
