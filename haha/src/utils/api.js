import { token, host, paramsObj } from '../constants/parameter.js'

export default async function (url, parameter) {
    return await fetch(
        `${host}${url}?Authorization=${token}${parameter}`,
        paramsObj
    ).then((res) => res.json())
}
