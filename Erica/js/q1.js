import { render, getLocation, getWeather } from './methods.js';

/** Q1 */
export default function q1(datas) {
    const filters = datas.filter((data) => getWeather(data, 'TEMP') !== '-99')
    const result = filters.reduce((acc, curr) => {
        return Number(getWeather(acc, 'TEMP')) > Number(getWeather(curr, 'TEMP')) ? curr : acc
    })

    const answer = {
        'city': getLocation(result, 'CITY'),
        'town': getLocation(result, 'TOWN'),
        'locationName': result.locationName,
        'temperature': getWeather(result, 'TEMP'),
        'locations': {
            'lat': result.lat,
            'lot': result.lon,
        }
    }

    render(answer, 1)
}
