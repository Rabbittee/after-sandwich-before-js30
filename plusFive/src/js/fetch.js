// import { writable } from "svelte/store";

let data

// 練習 svelte store fetch data 寫法
// export default function(url) {
//   const loading = writable(false)
//   const error = writable(false)
//   const data = writable({})

//   async function get() {
//     loading.set(true)
//     error.set(false)

//     try {
//       const res = await fetch(url)
//       data.set(await res.json())
//     } catch(e) {
//       error.set(e)
//     }

//     loading.set(false)
//   }

//   get()

//   return [data, loading, error, get]
// }

export default async function fetchData(host, apiPath, searchParams) {
  console.log(host, apiPath, searchParams.toString())
  const res = await fetch(`${host}/${apiPath}?${searchParams.toString()}`)

  if (res.statusText === 'OK') {
    data = await res.json()
  }

  return data
}