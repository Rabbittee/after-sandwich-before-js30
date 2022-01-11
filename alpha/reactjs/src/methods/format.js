import {
  temp,
  city,
  town,
  elev,
  rain,
  noData,
  tempPrediction,
} from "../constant";

const formatParameter = (parameter) => (data) => {
  const district = parameter?.reduce(
    (acc, { parameterName, parameterValue }) => {
      if (parameterName === city) {
        return { ...acc, city: parameterValue };
      } else if (parameterName === town) {
        return { ...acc, twon: parameterValue };
      }
      return acc;
    },
    {}
  );
  return { ...data, ...district };
};

const formatWeatherElemnet = (weatherElement) => (data) => {
  const weather = weatherElement?.reduce(
    (acc, { elementName, elementValue, time }) => {
      if (elementName === temp) {
        return { ...acc, temp: Number(elementValue) };
      } else if (elementName === elev) {
        return { ...acc, elev: Number(elementValue) };
      } else if (elementName === rain) {
        return { ...acc, rain: Number(elementValue) };
      } else if (elementName === tempPrediction) {
        return { ...acc, tempInTime: time };
      }
      return acc;
    },
    {}
  );
  return { ...data, ...weather };
};

const isValid = (data) => (data.temp === noData ? false : data);

const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);

export const formatData = (acc, cur) => {
  const { parameter, weatherElement } = cur;
  const newData = pipe(
    formatParameter(parameter),
    formatWeatherElemnet(weatherElement),
    isValid
  )(cur);
  return newData ? [...acc, newData] : acc;
};

export const formatTempData = (acc, cur) => {
  const { weatherElement } = cur;
  const newData = pipe(formatWeatherElemnet(weatherElement), isValid)(cur);
  return newData ? [...acc, newData] : acc;
};
