/**
 * @typedef FormatProps
 * @type {"JSON"|"XML"}
 *
 * @typedef ElementNameProps
 * @type {"ELEV"| "WDIR"| "WDSD"| "TEMP"| "HUMD"| "PRES"| "SUN"| "H_24R"| "WS15M"| "WD15M"| "WS15T"| "H_FXT"| "D_TXT"| "D_INT"}
 *
 * @typedef ParameterNameProps
 * @type {"CITY" | "CITY_SN" | "TWON" | "TWON_SN"}
 */

/**
 * @typedef QueryWeatherConditions
 * @type {object}
 * @property {number} limit - 限制最多回傳的資料，預設為回傳全部筆數. 
 * @property {number} offset - 限制最多回傳的資料，預設為回傳全部筆數 .
 * @property {string} locationName - 測站代碼，請參考https://e-service.cwb.gov.tw/wdps/obs/state.htm ，預設為全部回傳.
 * @property {FormatProps} format - 指定從第幾筆後開始回傳，預設為第 0 筆開始回傳 . 
 * @property {ElementNameProps[]} elementName - 天氣因子. 
 * @property {ParameterNameProps[]} parameterName - id or name. 
 */


const serialize = (props, format= () => {}) => {
  return Object.keys(props).map((key) => format(props,key));
};
function handleQueryString(props,key){
  if(Array.isArray(props[key])) return `&${key}=${props[key].join(",")}`
  return ""
}
function queryAPI(baseUrl, Authorization) {   
  if(!Authorization){
    throw Error("Please type token of CWB");
  }
  /**
   *  @param {string} apth
   *  @param {QueryWeatherConditions} queryStringProps
   */
  return async function (path, queryStringProps) {
      const auth = new URLSearchParams({Authorization})
      const queryStrings = queryStringProps ? serialize( queryStringProps,handleQueryString) : "";
      return fetch(baseUrl + path + `?${auth}` + queryStrings).then((response) => response.json())
  };
}
export const queryCwb = queryAPI(
  "https://opendata.cwb.gov.tw/api/v1/rest/datastore/",
  "CWB-E8AC8336-9346-4D8A-A2D4-EB1934B7C25D"
);