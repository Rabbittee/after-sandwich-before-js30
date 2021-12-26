import { getCurrentData, token } from "../fetch.js";
import { getElementValue, getParameterValue } from "../utils.js";
import { city, town, rain } from "../global.js";

const apiPath = "O-A0002-001";
const { Authorization } = token;
const paramsObj = {
  Authorization: Authorization,
  parameterName: [city, town],
  elementName: rain,
};

export const answer3 = async () => {
  const data = await getCurrentData(apiPath, paramsObj);

  const locationData = data.records.location;

  const filterData = locationData
    .sort(function (a, b) {
      const valueA = getElementValue(a.weatherElement, rain);
      const valueB = getElementValue(b.weatherElement, rain);
      return valueB - valueA;
    })
    .slice(0, 20);

  const answer = {};
  filterData.map((item, i) => {
    const { locationName, weatherElement, stationId, parameter } = item;
    const cityName = getParameterValue(parameter, city);
    const answerObj = {
      No: i + 1,
      city: cityName,
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
