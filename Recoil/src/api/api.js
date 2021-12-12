//https://opendata.cwb.gov.tw/dist/opendata-swagger.html
const  WeatherElementsProps = "ELEV"
  | "WDIR"
  | "WDSD"
  | "TEMP"
  | "HUMD"
  | "PRES"
  | "SUN"
  | "H_24R"
  | "WS15M"
  | "WD15M"
  | "WS15T"
  | "H_FXT"
  | "D_TXT"
  | "D_INT";
// type ParameterNameProps = "CITY" | "CITY_SN" | "TWON" | "TWON_SN";
// type formatProps = "JSON" | "XML";
// enum QueryWeatherProps {
//   limit = "limit",
//   offset = "offset",
//   format = "format",
//   locationName = "locationName",
//   elementName = "elementName",
//   parameterName = "parameterName"
// }
// interface queryWeatherConditions {
//   [QueryWeatherProps.limit]?: number;
//   [QueryWeatherProps.offset]?: number;
//   [QueryWeatherProps.format]?: formatProps;
//   [QueryWeatherProps.locationName]?: string[];
//   [QueryWeatherProps.elementName]?: WeatherElementsProps[];
//   [QueryWeatherProps.parameterName]?: ParameterNameProps[];
// }

const serialize = (props, format= () => {}) => {
  return Object.keys(props).map((key) => format(key));
};

function queryAPI(baseUrl, Authorization) {
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
const queryCwb = queryAPI(
  "https://opendata.cwb.gov.tw/api/v1/rest/datastore/",
  "CWB-E8AC8336-9346-4D8A-A2D4-EB1934B7C25D"
);

/**
 * @namespace FormatProps
 * @return {"JSON"|"XML"}
 */
/**
 * @typedef QueryWeatherConditions
 * @type {object}
 * @property {number} limit - limit data quantity. 
 * @property {number} offset - offset data quantity.
 * @property {"JSON"|"XML"} format - format data quantity. 
 * @property {string} locationName - limit data quantity. 
 * @property {("ELEV"| "WDIR"| "WDSD"| "TEMP"| "HUMD"| "PRES"| "SUN"| "H_24R"| "WS15M"| "WD15M"| "WS15T"| "H_FXT"| "D_TXT"| "D_INT")[]} elementName - limit data quantity. 
 * @property {string} parameterName - limit data quantity. 
 */

//automatic weather station
//getAutomaticStationSeries({ elementName: ["TEMP", "ELEV", "WDIR"] });

/**
 * @name getAutomaticStationSeries
 * @param {QueryWeatherConditions} queryStrings 
 * @returns {Array}
 */
export const getAutomaticStationSeries = (queryStrings) => queryCwb("O-A0001-001", queryStrings);
getAutomaticStationSeries({elementName:["ELEV","WDIR","WDSD"]})
//realtime weather station
//realtimeWeatherStation({elementName: "ELEV,WDIR,WDSD"})
/**
 * @name getRealtimeStationSeries
 * @param {QueryWeatherConditions} queryStrings 
 * @returns {Array}
 */
export const getRealtimeStationSeries = (queryStrings) => queryCwb("O-A0002-001", queryStrings);

export const getRealtimeStationSeries = (queryStrings) => queryCwb("F-D0047-001", queryStrings);