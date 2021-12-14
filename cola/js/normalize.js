import { pipe } from './utils.js';

/** 城市 */
const city = 'CITY';
/** 行政區 */
const town = 'TOWN';

/** 處理縣市和行政區 */
const normalizeCity = (parameter) => (data) => {
  const district = parameter?.reduce((prev, { parameterName, parameterValue }) => {
    if (parameterName === city) {
      return { ...prev, city: parameterValue };
    } else if (parameterName === town) {
      return { ...prev, town: parameterValue };
    }
    return prev;
  }, {});
  return { ...data, ...district };
};

/** 海拔(m) */
const elev = 'ELEV';
/** 溫度(攝氏) */
const temp = 'TEMP';
/** 24小時累積雨量 */
const hour24 = 'HOUR_24';

/** 處理一些資料 */
const normalizeWeather = (weatherElement) => (data) => {
  const weather = weatherElement.reduce((prev, { elementName, elementValue }) => {
    if (elementName === elev) {
      // 海拔
      return { ...prev, elev: Number(elementValue) };
    } else if (elementName === temp) {
      // 溫度
      return { ...prev, temp: Number(elementValue) };
    } else if (elementName === hour24) {
      // 24小時累積雨量
      return { ...prev, rainfall: Number(elementValue) };
    }
    return prev;
  }, {});
  return { ...data, ...weather };
};

/** 吳姿嫽 */
const invalid = -99;
const isValid = (data) => (data.temp === invalid ? false : data);

/** 處理很多資料 */
export const normalizeLocation = (acc, cur) => {
  const { parameter, weatherElement } = cur;
  const ret = pipe(normalizeCity(parameter), normalizeWeather(weatherElement), isValid)(cur);
  return ret ? [...acc, ret] : acc;
};
