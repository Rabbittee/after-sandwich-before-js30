import { getCurrentData } from "../fetch.js";
import { getElementValue, getParameterValue } from "../utils.js";
import { city, town, rain, Authorization } from "../global.js";

const apiPath = "O-A0002-001";
const paramsObj = {
  Authorization,
  parameterName: [city, town],
  elementName: rain,
};

/**
 * 找出降雨量前20名所在縣市
 * @returns {object}
 */

export const answer3 = async () => {
  const data = await getCurrentData(apiPath, paramsObj);

  const locationData = data.records.location;

  const filterData = locationData
    //sort rainfall value
    .sort(function (a, b) {
      const valueA = getElementValue(a.weatherElement, rain);
      const valueB = getElementValue(b.weatherElement, rain);
      return valueB - valueA;
    })
    //get first 20
    .slice(0, 20);

  const answer = {};

  //format data
  filterData.map((item, i) => {
    const { locationName, weatherElement, stationId, parameter } = item;
    const cityName = getParameterValue(parameter, city);
    const answerObj = {
      No: i + 1,
      測站名稱: locationName + stationId,
      降雨量: getElementValue(weatherElement, rain),
    };
    if (answer[cityName]) {
      answer[cityName].push(answerObj);
    } else {
      answer[cityName] = [{ ...answerObj }];
    }
    return answer;
  });

  return answer;
};
