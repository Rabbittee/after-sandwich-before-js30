const Max = (arr) => Math.max(...arr)
const Min = (arr) => Math.min(...arr)
const tempList = (arr) => arr.map((el) => el.elementValue[0].value)
const sum = (arr) => arr.reduce((a, b) => a + b)
const arrRemove = (arr, val) => {
    return arr.filter((el) => el !== val)
}
const validWeather = (arr) =>
    arr.filter((el) => el.weatherElement[3].elementValue !== String(-99))

const sameWeather = (arr, val) =>
    arr.filter((el) => el.elementValue[0].value === String(val))
const formatData = (arr, id, index) => {
    const title = id === 1 ? '' : `${index * 500} ~ ${(index + 1) * 500}公尺`
    const city = arr[0].parameter[0].parameterValue
    const town = arr[0].parameter[2].parameterValue
    const name = arr[0].locationName
    const temp = Min(arr.map((el) => el.weatherElement[3].elementValue))
    const location = { lon: arr[0].lon, lat: arr[0].lat }
    return { title, city, town, name, temp, location }
}
export {
    Max,
    Min,
    tempList,
    sum,
    arrRemove,
    validWeather,
    sameWeather,
    formatData,
}
