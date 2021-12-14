import { pipe } from './utils.js';

const normalizeCity = (parameter) => (data) => {
  const city = parameter?.reduce((prev, { parameterName, parameterValue }) => {
    if (parameterName === 'CITY') {
      return { ...prev, city: parameterValue };
    } else if (parameterName === 'TOWN') {
      return { ...prev, town: parameterValue };
    }
    return prev;
  }, {});
  return { ...data, ...city };
};

const normalizeWeather = (weatherElement) => (data) => {
  const weather = weatherElement.reduce((prev, { elementName, elementValue }) => {
    if (elementName === 'ELEV') {
      // 海拔
      return { ...prev, elev: Number(elementValue) };
    } else if (elementName === 'TEMP') {
      // 溫度
      return { ...prev, temp: Number(elementValue) };
    } else if (elementName === 'HOUR_24') {
      // 24小時累積雨量
      return { ...prev, rainfall: Number(elementValue) };
    }
    return prev;
  }, {});
  return { ...data, ...weather };
};

const isValid = (data) => (data.temp === -99 ? false : data);

export const normalizeLocation = (acc, cur) => {
  const { parameter, weatherElement } = cur;
  const ret = pipe(normalizeCity(parameter), normalizeWeather(weatherElement), isValid)(cur);
  return ret ? [...acc, ret] : acc;
};
