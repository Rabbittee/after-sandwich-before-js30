import { validWeather, min, formatData } from '../utils/methods.js'

export default function (data, id) {
    const valid = validWeather(data)
    const tempList = valid.map((el) => el.weatherElement[3].elementValue)
    const minVal = min(tempList)
    const result = valid.filter(
        (el) => minVal === +el.weatherElement[3].elementValue
    )
    return { ...formatData(result, id) }
}
