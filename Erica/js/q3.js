import { render, getLocation, getWeather } from './methods.js'
const invalid = '-99'
const rain = 'HOUR_24'
const city = 'CITY'
const town = 'TOWN'

/** Q3 */
export default function q3(datum) {

    // 1. 過濾資料
    // 2. 依照雨量大小排序
    // 3. 取出前20
    const filters = datum
        .filter((data) => !getWeather(data, rain).includes(invalid))
        .sort((a, b) => Number(getWeather(b, rain)) - Number(getWeather(a, rain)))
        .slice(0, 20)

    // 4. 整理格式、渲染
    const answer = filters.map((data, index) => {
        return {
            [index + 1]: {
                [getLocation(data, city)]: getLocation(data, town),
                [data.locationName]: getWeather(data, rain)
            }
        }
    })

    render(answer, 3)
}