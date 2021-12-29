import dayjs from 'dayjs'

const host = import.meta.env.VITE_BACKEND_HOST

const token = import.meta.env.VITE_BACKEND_TOKEN

const header = {
    Authorization: token,
}

const featureOneDay = dayjs()
    .add(1, 'day')
    .hour(0)
    .minute(0)
    .second(0)
    .format('YYYY-MM-DDTHH:mm:ss')

const featureNextDay = dayjs()
    .add(2, 'day')
    .hour(23)
    .minute(59)
    .second(59)
    .format('YYYY-MM-DDTHH:mm:ss')

export { host, header, featureOneDay, featureNextDay }
