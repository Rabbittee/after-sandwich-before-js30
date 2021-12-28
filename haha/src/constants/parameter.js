import dayjs from 'dayjs'

const token = 'CWB-3DDB77B5-643B-4E2D-B0AE-4218ADEB7C9F'
const host = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/'
const paramsObj = {
    Headers: {
        Authorization: token,
    },
}
const lastOneDay = dayjs()
    .add(1, 'day')
    .hour(0)
    .minute(0)
    .second(0)
    .format('YYYY-MM-DDTHH:mm:ss')
const lastTwoDay = dayjs()
    .add(2, 'day')
    .hour(23)
    .minute(59)
    .second(59)
    .format('YYYY-MM-DDTHH:mm:ss')
export { token, host, paramsObj, lastOneDay, lastTwoDay }
