import { render } from './methods.js'

const convertString = function (fn, data) {
    return Object[fn](data).toString()
}
const dateFormate = function (date) {
    const d = new Date(date * 1000).toLocaleDateString().split('/');
    return `${d[0]}-${d[1] < 10 ? 0 + d[1] : d[1]}-${d[2] < 10 ? 0 + d[2] : d[2]}`
}

/** Q4 */
export default function q4(datum) {

    // 1. 把資料轉成 Timestemp 並取出 48 小時內溫度
    const nowTime = Math.floor(Date.now() / 1000)
    const dateTime = datum.weatherElement[0].time
    const timeRange = 60 * 60 * 48

    const filterDatum = dateTime.reduce((acc, curr) => {

        const timestemp = Math.floor(new Date(curr.dataTime).getTime() / 1000)
        const temperature = curr.elementValue[0].value

        if (!acc) acc.dataTime = []
        if (timestemp >= nowTime && timestemp <= nowTime + timeRange) {
            acc.push({
                [dateFormate(timestemp)]: temperature
            })
        }

        return acc
    }, [])

    // 2. 取出最高溫 及 最低溫
    const maxT = filterDatum.reduce((acc, curr) => Object.values(acc) < Object.values(curr) ? curr : acc)
    const minT = filterDatum.reduce((acc, curr) => Object.values(acc) > Object.values(curr) ? curr : acc)

    // 3. 分類出同一天
    const dateGroup = filterDatum.reduce((acc, curr) => {
        for (let key of Object.keys(curr)) {
            if (!acc[key]) acc[key] = []
            acc[key].push(Number(Object.values(curr)))
        }
        return acc
    }, {})

    //4. 取出單日溫差值最大的日期及溫度
    const dateDiff = []
    for(let [key, value] of Object.entries(dateGroup)) {
        dateDiff.push({
           [key]:  Math.max(...value) - Math.min(...value)
        })
    }
    const maxDiff = dateDiff.reduce((acc, curr) => Object.values(acc) < Object.values(curr) ? curr : acc)

    // 5. 整理資料格式
    const answer = {
        '最低溫': {
            'date': convertString('keys', minT),
            'value': convertString('values', minT)
        },
        '最高溫': {
            'date': convertString('keys', maxT),
            'value': convertString('values', maxT)
        },
        '單日最大溫差': {
            'date': convertString('keys', maxDiff),
            'maxDiff': convertString('values', maxDiff)
        }
    }
    render(answer, 4)
}