import Axios from "axios";
import { cwb } from "./config.js";
const axios = Axios.create({
    baseURL: `${cwb.host}${cwb.prefix}`,
});
const concatParamsForApi = (params = {}) => {
    return {
        params: {
            authorization: cwb.token,
            ...params,
        },
    };
};

/**
 *  GET /v1/rest/datastore/O-A0003-001
 *  局屬氣象站-現在天氣觀測報告
 *  @returns {Promise}
 */
export function getWeatherCurrentRecord(params = {}) {
    return axios.get("/O-A0003-001", concatParamsForApi(params));
}

/**
 *  GET /v1/rest/datastore/O-A0002-001
 *  自動雨量站-雨量觀測資料
 *  @returns {Promise}
 */
export function getRainCurrentRecord(params = {}) {
    return axios.get("/O-A0002-001", concatParamsForApi(params));
}

/**
 *  GET /v1/rest/datastore/F-D0047-091
 *  鄉鎮天氣預報-臺灣未來1週天氣預報
 *  @returns {Promise}
 */
export function getWeeklyWeatherForecast(params = {}) {
    return axios.get("/F-D0047-091", concatParamsForApi(params));
}

/**
 *  GET /v1/rest/datastore/F-D0047-089
 *  鄉鎮天氣預報-臺灣未來 2 天天氣預報
 *  @returns {Promise}
 */
export function getTwoDaysForecast(params = {}) {
    return axios.get("/F-D0047-089", concatParamsForApi(params));
}
