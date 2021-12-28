import { host, header } from '../constants/parameter.js'

export default async function (url, parameter) {
    const paramsObj = { ...header, ...parameter }
    const searchParams = new URLSearchParams(paramsObj)

    return await fetch(`${host}${url}?${searchParams.toString()}`).then((res) =>
        res.json()
    )
}
