import { validWeather, formatData } from '../utils/methods.js'

export default function (data, id, result = {}) {
    let group = {}
    data.forEach((el) => {
        const temp = el.weatherElement[0].elementValue
        const id = parseInt(temp / 500)
        if (!group[id]) group[id] = []
        group[id].push(el)
    })
    let i = 0
    while (group[i]) {
        result[i] = formatData(validWeather(group[i]), id, i)
        i++
    }
    return result
}
