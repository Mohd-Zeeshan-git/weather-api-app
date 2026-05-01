
export function getBackground(condition){
 const c = condition?.toLowerCase() || ''
 if(c.includes('rain')) return 'bg-gradient-to-br from-slate-800 to-blue-900'
 if(c.includes('cloud')) return 'bg-gradient-to-br from-gray-700 to-slate-900'
 if(c.includes('snow')) return 'bg-gradient-to-br from-blue-200 to-blue-500'
 if(c.includes('clear')) return 'bg-gradient-to-br from-lavender-400 to-lavender-500'
 return 'bg-gradient-to-br from-slate-800 to-slate-900'
}
