import { tempList, max, min, sameWeather, sum } from '../utils/methods.js'
import { lastOneDay } from '../constants/parameter.js'
import dayjs from 'dayjs'

export default function (data) {
    const weather = data.weatherElement[0].time
    const lastOneTemp = weather.filter(
        (el) => dayjs(el.dataTime).get('date') === dayjs(lastOneDay).get('date')
    )
    const lastTwoTemp = weather.filter(
        (el) => dayjs(el.dataTime).get('date') !== dayjs(lastOneDay).get('date')
    )
    const [
        daysMax,
        daysMin,
        todayOneMax,
        todayOneMin,
        todayTwoeMax,
        todayTwoMin,
    ] = [
        max(tempList(weather)),
        min(tempList(weather)),
        max(tempList(lastOneTemp)),
        min(tempList(lastOneTemp)),
        max(tempList(lastTwoTemp)),
        min(tempList(lastTwoTemp)),
    ]

    const maxDays = sameWeather(weather, daysMax)
    const minDays = sameWeather(weather, daysMin)

    const showData = (arr) =>
        arr.map((el) => {
            return { time: el.dataTime, temp: el.elementValue[0].value }
        })
    const [sumOneTemp, sumTwoTemp] = [
        sum([todayOneMax, todayOneMin]),
        sum([todayTwoeMax, todayTwoMin]),
    ]
    return {
        H_temp: showData(maxDays),
        L_temp: showData(minDays),
        today_temp:
            sumOneTemp > sumTwoTemp
                ? todayTwoeMax - todayTwoMin
                : todayOneMax - todayOneMin,
    }
}
