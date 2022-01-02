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

<<<<<<< HEAD
    // 4. 統計分佈縣市
    const answer = filters.reduce((acc, curr) => {

        const currCity = getLocation(curr, city)
        const currTown = getLocation(curr, town)
        const currRain = getWeather(curr, rain)
        
        if( !acc ) acc = {}
        if( !acc[currCity] ) acc[currCity] = {}
        if( !acc[currCity][currTown] ) acc[currCity][currTown] = {}
        acc[currCity][currTown][`${curr['locationName']}_${curr['stationId']}`] = currRain

        return acc
        
    }, {})
=======
    // 4. 整理格式、渲染
    const answer = filters.map((data, index) => {
        return {
            [index + 1]: {
                [getLocation(data, city)]: getLocation(data, town),
                [data.locationName]: getWeather(data, rain)
            }
        }
    })
>>>>>>> d8fbb11edcb02ece41884d8222adf12649b3009d

    render(answer, 3)
}