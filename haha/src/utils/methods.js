const validWeather = (arr) =>
    arr.filter((el) => el.weatherElement[3].elementValue !== '-99')

const min = (arr, key) => {
    const index = findArrIdx(arr[0].weatherElement, key, 'weather')
    const result = arr.reduce((prev, curr) => {
        return Number(prev.weatherElement[index].elementValue) <
            Number(curr.weatherElement[index].elementValue)
            ? prev
            : curr
    })
    return result
}

const returnKey = (type, key1, key2) => (type === 'weather' ? key1 : key2)

const findArrIdx = (arr, key, type) =>
    arr.findIndex(
        (el) => el[returnKey(type, 'elementName', 'parameterName')] === key
    )

const findData = (arr, key, type) => {
    const parameter = returnKey(type, 'weatherElement', 'parameter')
    const val = returnKey(type, 'elementValue', 'parameterValue')
    const index = findArrIdx(arr[parameter], key, type)
    return arr[parameter][index][val]
}

const formatData = (arr) => {
    const city = findData(arr, 'CITY')
    const town = findData(arr, 'TOWN')
    const temp = findData(arr, 'TEMP', 'weather')
    return { city, town, temp }
}

export { validWeather, min, findArrIdx, findData, formatData }
