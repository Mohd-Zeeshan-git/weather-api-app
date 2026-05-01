import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

if (!API_KEY) {
  console.error('❌ Missing VITE_WEATHER_API_KEY in .env file')
}

export const weatherApi = createApi({
  reducerPath: 'weatherApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/',
  }),

  tagTypes: ['Weather'],

  endpoints: (builder) => ({

    /* ============================= */
    /* 🌍 Geocoding Search */
    /* ============================= */
    geoSearch: builder.query({
      query: (query) => ({
        url: 'geo/1.0/direct',
        params: {
          q: query,
          limit: 5,
          appid: API_KEY,
        },
      }),
      keepUnusedDataFor: 300,
    }),
geoReverse: builder.query({
  query: ({ lat, lon }) =>
    `geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${import.meta.env.VITE_WEATHER_API_KEY}`,
}),
    /* ============================= */
    /* 🌤 Current Weather */
    /* ============================= */
    current: builder.query({
      query: ({ lat, lon, unit }) => ({
        url: 'data/2.5/weather',
        params: {
          lat,
          lon,
          units: unit, // 'metric' or 'imperial'
          appid: API_KEY,
        },
      }),
      providesTags: ['Weather'],
      keepUnusedDataFor: 300,
    }),

    /* ============================= */
    /* 📅 Forecast (5 day / 3 hour) */
    /* ============================= */
    forecast: builder.query({
      query: ({ lat, lon, unit }) => ({
        url: 'data/2.5/forecast',
        params: {
          lat,
          lon,
          units: unit,
          appid: API_KEY,
        },
      }),
      providesTags: ['Weather'],
      keepUnusedDataFor: 300,
    }),
  }),

  refetchOnReconnect: true,
  refetchOnFocus: true,
})

export const {
  useGeoSearchQuery,
  useCurrentQuery,
  useForecastQuery,
  useGeoReverseQuery,
} = weatherApi
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

// if (!API_KEY) {
//   console.error('❌ Missing VITE_WEATHER_API_KEY in .env file')
// }

// export const weatherApi = createApi({
//   reducerPath: 'weatherApi',

//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://api.openweathermap.org/data/2.5/',
//   }),

//   tagTypes: ['Weather'],

//   endpoints: (builder) => ({
//     geoSearch: builder.query({
//   query: (query) => ({
//     url: `https://api.openweathermap.org/geo/1.0/direct`,
//     params: {
//       q: query,
//       limit: 5,
//       appid: import.meta.env.VITE_WEATHER_API_KEY,
//     },
//   }),
// }),
    
//     // 🌤 Current Weather
//     current: builder.query({
//       query: ({ city, unit }) => ({
//         url: 'weather',
//         params: {
//           q: city,
//           units: unit,
//           appid: API_KEY,
//         },
//       }),

//       providesTags: ['Weather'],

//       transformResponse: (response) => ({
//         ...response,
//         temp: Math.round(response.main.temp),
//       }),

//       keepUnusedDataFor: 300, // cache for 5 minutes
//     }),

//     // 📅 Forecast
//     forecast: builder.query({
//       query: ({ city, unit }) => ({
//         url: 'forecast',
//         params: {
//           q: city,
//           units: unit,
//           appid: API_KEY,
//         },
//       }),

//       providesTags: ['Weather'],

//       keepUnusedDataFor: 300,
//     }),
//   }),

//   refetchOnReconnect: true,
//   refetchOnFocus: true,
// })

// export const {
//   useCurrentQuery,
//   useForecastQuery,
//   useGeoSearchQuery,
// } = weatherApi





// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// export const weatherApi=createApi({
//   reducerPath:'weatherApi',
//   baseQuery:fetchBaseQuery({
//     baseUrl:'https://api.openweathermap.org/data/2.5/'
//   }),
//   endpoints:(builder)=>({
//     current:builder.query({
//       query:({city,unit})=>`weather?q=${city}&units=${unit}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
//     }),
//     forecast:builder.query({
//       query:({city,unit})=>`forecast?q=${city}&units=${unit}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
//     })
//   })
// })

// export const { useCurrentQuery,useForecastQuery }=weatherApi







// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// export const weatherApi = createApi({
//   reducerPath: 'weatherApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://api.openweathermap.org/data/2.5/'
//   }),
//   endpoints: builder => ({
//     current: builder.query({
//       query: ({ city }) =>
//         `weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
//     })
//   })
// })

// export const { useCurrentQuery } = weatherApi






// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// export const weatherApi=createApi({
//  reducerPath:'weatherApi',
//  baseQuery:fetchBaseQuery({
//   baseUrl:'https://api.openweathermap.org/data/2.5/'
//  }),
//  endpoints:(builder)=>({
//   current:builder.query({
//    query:({city})=>`weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
//   }),
//   forecast:builder.query({
//    query:({city})=>`forecast?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
//   })
//  })
// })

// export const { useCurrentQuery,useForecastQuery }=weatherApi
