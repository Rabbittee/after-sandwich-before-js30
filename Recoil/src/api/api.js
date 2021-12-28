import { token } from "./api.config.js";
const baseUrl = "https://opendata.cwb.gov.tw/api";
function queryAPI(Authorization) {
  if (!Authorization) {
    throw Error("Please type token of CWB");
  }
  /**
   *  @param {string} apth
   *  @param {QueryWeatherConditions} queryStringProps
   */
  return async function (path, queryStringProps) {
    const queryParams = new URLSearchParams({
      Authorization,
      ...queryStringProps,
    });
    return fetch(
      `${baseUrl}${path}${queryParams ? "?" : ""}${queryParams}`
    ).then((response) => response.json());
  };
}
export const queryCwb = queryAPI(token);
