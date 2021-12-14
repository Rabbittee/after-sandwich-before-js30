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
 * @property {ElementNameProps[]} elementName - weather elements. 
 * @property {ParameterNameProps[]} parameterName - id or name. 
 */


const serialize = (props, format= () => {}) => {
  return Object.keys(props).map((key) => format(key));
};

function queryAPI(baseUrl, Authorization) {
    /**
     *  @param {string} apth
     *  @param {QueryWeatherConditions} queryStringProps
     */
  return async function (
    path,
    queryStringProps
  ) {
    const auth = Authorization ? `?Authorization=${Authorization}` : "";
    const queryStrings = queryStringProps
      ? serialize(
          queryStringProps,
          (key) =>
            `&${key}=${
              Array.isArray(queryStringProps[key])
                ? queryStringProps[key].join(",")
                : queryStringProps[key]
            }`
        )
      : "";
    return fetch(baseUrl + path + auth + queryStrings).then((response) =>
      response.json()
    );
  };
}
export const queryCwb = queryAPI(
  "https://opendata.cwb.gov.tw/api/v1/rest/datastore/",
  "CWB-E8AC8336-9346-4D8A-A2D4-EB1934B7C25D"
);





//automatic weather station
//getAutomaticStationSeries({ elementName: ["TEMP", "ELEV", "WDIR"] });
/**
 * @name getAutomaticStationSeries path - O-A0001-001
 * @param {QueryWeatherConditions} queryStrings 
 * @returns {Array}
 * 
 */

export const getAutomaticStationSeries = (queryStrings) => queryCwb("O-A0001-001", queryStrings);

//realtime weather station
//realtimeWeatherStation({elementName: "ELEV,WDIR,WDSD"})
/**
 * @name getRealtimeStationSeries path - O-A0002-001
 * @param {QueryWeatherConditions} queryStrings 
 * @returns {Array}
 * path - "O-A0002-001"
 */
export const getRealtimeStationSeries = (queryStrings) => queryCwb("O-A0002-001", queryStrings);



/**
 * @name getStationSeries path - F-D0047-001
 * @param {QueryWeatherConditions} queryStrings 
 * @returns {Array}
 * 
 */
export const getStationSeries = (queryStrings) => queryCwb("F-D0047-001", queryStrings);