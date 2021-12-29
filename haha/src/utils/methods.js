
const validWeather = (arr) =>
    arr.filter((el) => el.weatherElement[3].elementValue !== '-99')

const min = (arr, key, isFeature) => {
    const index = findArrIdx(arr[0].weatherElement, key, 'weather')
    if (isFeature) {
        const data = arr[0].weatherElement[index].time
        const result = data.reduce((prev, curr) => {
            return Number(prev.elementValue[0].value) <
                Number(curr.elementValue[0].value)
                ? prev
                : curr
        })
        return result
    }
    const result = arr.reduce((prev, curr) => {
        return Number(prev.weatherElement[index].elementValue) <
            Number(curr.weatherElement[index].elementValue)
            ? prev
            : curr
    })
    return result
}

const max = (arr, key) => {
    const index = findArrIdx(arr[0].weatherElement, key, 'weather')
    const data = arr[0].weatherElement[index].time
    const result = data.reduce((prev, curr) => {
        return Number(prev.elementValue[0].value) >
            Number(curr.elementValue[0].value)
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

const formatData = (obj) => {
    const city = findData(obj, 'CITY')
    const town = findData(obj, 'TOWN')
    const temp = findData(obj, 'TEMP', 'weather')
    return { city, town, temp }
}

export { validWeather, min, max, findArrIdx, formatData }
