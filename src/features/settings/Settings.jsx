import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../../store/slices/themeSlice'
import { toggleUnit } from '../../store/slices/unitSlice'

export default function Settings() {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme.mode)
  const unit = useSelector((state) => state.unit.unit)

  /* 🔥 Apply dark class to entire website */
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className="glass p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Settings</h2>

      <div className="flex justify-between items-center">
        <span>Theme</span>
        <button
          onClick={() => dispatch(toggleTheme())}
          className="px-4 py-2 rounded-lg bg-blue-500"
        >
          {theme === 'dark' ? 'Dark 🌙' : 'Light ☀️'}
        </button>
      </div>

      <div className="flex justify-between items-center">
        <span>Unit</span>
        <button
          onClick={() => dispatch(toggleUnit())}
          className="px-4 py-2 rounded-lg bg-green-500"
        >
          {unit === 'metric' ? 'Celsius' : 'Fahrenheit'}
        </button>
      </div>
    </div>
  )
}
// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

// import { toggleTheme } from '../../store/slices/themeSlice'
// import { toggleUnit } from '../../store/slices/unitSlice'

// export default function Settings() {
//   const dispatch = useDispatch()

//   const theme = useSelector((state) => state.theme.mode)
//   const unit = useSelector((state) => state.unit.unit)

//   /* ----------------------------
//      Apply dark class properly
//   ----------------------------- */
//   useEffect(() => {
//     if (theme === 'dark') {
//       document.documentElement.classList.add('dark')
//     } else {
//       document.documentElement.classList.remove('dark')
//     }
//   }, [theme])

//   return (
//     <div className="glass p-6 space-y-6">

//       <h2 className="text-2xl font-semibold">
//         Settings
//       </h2>

//       {/* Theme Toggle */}
//       <div className="flex justify-between items-center">
//         <span>Theme</span>

//         <button
//           onClick={() => dispatch(toggleTheme())}
//           className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition"
//         >
//           {theme === 'dark'
//             ? 'Dark 🌙'
//             : 'Light ☀️'}
//         </button>
//       </div>

//       {/* Unit Toggle */}
//       <div className="flex justify-between items-center">
//         <span>Temperature Unit</span>

//         <button
//           onClick={() => dispatch(toggleUnit())}
//           className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition"
//         >
//           {unit === 'metric'
//             ? 'Celsius (°C)'
//             : 'Fahrenheit (°F)'}
//         </button>
//       </div>

//     </div>
//   )
// }
// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { toggleTheme } from '../../store/slices/themeSlice'
// import { toggleUnit } from '../../store/slices/unitSlice'

// export default function Settings() {
//   const dispatch = useDispatch()

//   const theme = useSelector((state) => state.theme.mode)
//   const unit = useSelector((state) => state.unit.unit)

//   // Apply dark class properly (DO NOT do DOM logic in reducer)
//   useEffect(() => {
//     if (theme === 'dark') {
//       document.documentElement.classList.add('dark')
//     } else {
//       document.documentElement.classList.remove('dark')
//     }
//   }, [theme])
//   // useEffect(() => {
//   //   if(unit==='imperial') {
//   //     document.documentElement.classList.remove('metric')
//   //     document.documentElement.classList.add('imperial')
//   //   }
//   //   else {
//   //     document.documentElement.classList.remove('imperial')
//   //     document.documentElement.classList.add('metric')
//   //   }
//   // },[unit])

//   return (
//     <div className="backdrop-blur-xl bg-white/10 dark:bg-slate-900/50 rounded-2xl p-6 shadow-xl space-y-6 text-white">
//       <h2 className="text-2xl font-semibold">Settings</h2>

//       {/* Theme Toggle */}
//       <div className="flex justify-between items-center">
//         <span>Theme</span>
//         <button
//           onClick={() => dispatch(toggleTheme())}
//           className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition"
//         >
//           {theme === 'dark' ? 'Dark 🌙' : 'Light ☀️'}
//         </button>
//       </div>

//       {/* Unit Toggle */}
//       <div className="flex justify-between items-center">
//         <span>Temperature Unit</span>
//         <button
//           onClick={() => dispatch(toggleUnit())}
//           className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition"
//         >
//           {unit === 'C' ? 'Celsius °C' : 'Fahrenheit °F'}
//         </button>
//       </div>
//     </div>
//   )
// }
// import { useDispatch, useSelector } from 'react-redux'
// import { toggleTheme } from '../../../src (20)/store/slices/themeSlice'
// import { toggleUnit } from '../../../src (20)/store/slices/unitSlice'

// export default function Settings(){
//  const dispatch=useDispatch()
//  const theme=useSelector(s=>s.theme.mode)
//  const unit=useSelector(s=>s.unit.unit)

//  return(
//   <div className="p-6 bg-slate-800 text-white">
//    <button onClick={()=>dispatch(toggleTheme())}
//     className="mr-4 p-2 bg-blue-500 rounded">
//     Toggle Theme ({theme})
//    </button>
//    <button onClick={()=>dispatch(toggleUnit())}
//     className="p-2 bg-green-500 rounded">
//     Toggle Unit ({unit})
//    </button>
//   </div>
//  )
// }




// // import { useDispatch, useSelector } from 'react-redux'
// // import { toggleTheme } from '../../store/slices/themeSlice'
// // import { toggleUnit } from '../../store/slices/unitSlice'

// // export default function Settings(){
// //   const dispatch = useDispatch()
// //   const theme = useSelector(state => state.theme)
// //   const unit = useSelector(state => state.unit)

// //   return (
// //     <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 shadow-xl space-y-4">
// //       <h2 className="text-xl font-semibold">Settings</h2>
// //       <div className="flex justify-between items-center">
// //         <span>Theme</span>
// //         <button onClick={()=>dispatch(toggleTheme())}
// //           className="px-4 py-2 rounded-lg bg-white/20">
// //           {theme}
// //         </button>
// //       </div>
// //       <div className="flex justify-between items-center">
// //         <span>Unit</span>
// //         <button onClick={()=>dispatch(toggleUnit())}
// //           className="px-4 py-2 rounded-lg bg-white/20">
// //           {unit}
// //         </button>
// //       </div>
// //     </div>
// //   )
// // }




// // import { useDispatch, useSelector } from 'react-redux'
// // import { toggleTheme } from '../../store/slices/themeSlice'
// // import { toggleUnit } from '../../store/slices/unitSlice'

// // export default function Settings(){
// //   const dispatch = useDispatch()
// //   const theme = useSelector(state => state.theme)
// //   const unit = useSelector(state => state.unit)

// //   return (
// //     <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 shadow-xl space-y-4">
// //       <h2 className="text-xl font-semibold">Settings</h2>
// //       <div className="flex justify-between items-center">
// //         <span>Theme</span>
// //         <button
// //           onClick={()=>dispatch(toggleTheme())}
// //           className="px-4 py-2 rounded-lg bg-white/20"
// //         >
// //           {theme}
// //         </button>
// //       </div>
// //       <div className="flex justify-between items-center">
// //         <span>Unit</span>
// //         <button
// //           onClick={()=>dispatch(toggleUnit())}
// //           className="px-4 py-2 rounded-lg bg-white/20"
// //         >
// //           {unit}
// //         </button>
// //       </div>
// //     </div>
// //   )
// // }

