import Axios from "axios";

const axios = Axios.create({
    baseURL: "https://opendata.cwb.gov.tw/api/v1/rest/datastore/",
});

const authorization = "CWB-A00AAFC4-FFD9-4A03-A760-7F9336CE62FC";
const concatParamsForApi = (params = {}) => {
    return {
        params: {
            authorization,
            ...params,
        },
    };
};

export const allLocations = [
    { text: "臺北市", value: "臺北市" },
    { text: "新北市", value: "新北市" },
    { text: "桃園市", value: "桃園市" },
    { text: "宜蘭縣", value: "宜蘭縣" },
    { text: "花蓮縣", value: "花蓮縣" },
    { text: "澎湖縣", value: "澎湖縣" },
    { text: "臺東縣", value: "臺東縣" },
    { text: "金門縣", value: "金門縣" },
    { text: "連江縣", value: "連江縣" },
    { text: "臺中市", value: "臺中市" },
    { text: "臺南市", value: "臺南市" },
    { text: "高雄市", value: "高雄市" },
    { text: "基隆市", value: "基隆市" },
    { text: "新竹縣", value: "新竹縣" },
    { text: "新竹市", value: "新竹市" },
    { text: "苗栗縣", value: "苗栗縣" },
    { text: "彰化縣", value: "彰化縣" },
    { text: "南投縣", value: "南投縣" },
    { text: "雲林縣", value: "雲林縣" },
    { text: "嘉義縣", value: "嘉義縣" },
    { text: "嘉義市", value: "嘉義市" },
    { text: "屏東縣", value: "屏東縣" },
];

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
