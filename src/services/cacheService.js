
export function saveCache(key,data){
  localStorage.setItem(key,JSON.stringify(data))
}

export function getCache(key){
  const v=localStorage.getItem(key)
  return v?JSON.parse(v):null
}
