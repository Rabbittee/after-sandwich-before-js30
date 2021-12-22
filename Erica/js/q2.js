import { render, getLocation, getWeather } from './methods.js';
import './utils.js'

/** Q2 */
export default function q2(datas) {

    // 1. 過濾沒有資料
    const filters = datas.filter((data) => getWeather(data, 'ELEV') !== '-99')

    // 2. 取出高度級距
    const heighest = filters.reduce((acc, curr) => {
        return Number(getWeather(acc, 'ELEV')) > Number(getWeather(curr, 'ELEV')) ? acc : curr
    })
    const mete = (data) => Math.ceil(getWeather(data, 'ELEV') / 500)
    const range = new Array(mete(heighest)).fill([])

    // 3. 依照級距將陣列分組
    const groups = range.map((item, index) => {
        return filters.filter((data) => mete(data) - 1 === index &&
                getWeather(data, 'TEMP') !== '-99')
    })

    // 4. 陣列中各分組取出最低溫
    const result = groups.map((data) => {
        return data.reduce((acc, curr) => {
            return Number(getWeather(acc, 'TEMP')) < Number(getWeather(curr, 'TEMP')) ? acc : curr
        })
    })

    // 5. 整理格式、渲染到畫面上
    const answer = result.map((data, index) => {
        return {
            [(index + 1) * 500]: {
                'city': getLocation(data, 'CITY'),
                'town': getLocation(data, 'TOWN'),
                'locationName': data.locationName,
                'altitude': getWeather(data, 'ELEV'),
                'temperature': getWeather(data, 'TEMP'),
            }
        }
    })
    render(answer, 2)
}
