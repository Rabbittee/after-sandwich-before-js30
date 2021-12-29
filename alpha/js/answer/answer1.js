import { getCurrentData } from "../fetch.js";
import { getElementValue, getParameterValue } from "../utils.js";
import { temp, city, town, noData, Authorization } from "../global.js";

const apiPath = "O-A0001-001";
const paramsObj = {
  Authorization,
  parameterName: [city, town],
  elementName: temp,
};

/**
 * 找出當下最低溫位置
 * @returns {object}
 */
export const answer1 = async () => {
  const data = await getCurrentData(apiPath, paramsObj);

  const locationData = data.records.location;

  const currentObj = locationData
    //filter no data
    .filter((item) => {
      return getElementValue(item.weatherElement, temp) !== noData;
    })
    //find the lowest temperature
    .reduce((prev, item) => {
      return Number(getElementValue(item.weatherElement, temp)) <
        Number(getElementValue(prev.weatherElement, temp))
        ? item
        : prev;
    });

  const { locationName, lat, lon, parameter, weatherElement } = currentObj;

  const answer = {
    縣市: getParameterValue(parameter, city),
    行政區: getParameterValue(parameter, town),
    測站名稱: locationName,
    溫度: getElementValue(weatherElement, temp),
    座標: {
      lat: lat,
      lon: lon,
    },
  };
  return answer;
};
