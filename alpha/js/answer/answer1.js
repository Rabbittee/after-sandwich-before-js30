import { getCurrentData, errorCode, answers } from "../script.js";

const apiPath = 'api/v1/rest/datastore/O-A0001-001';
export const answer1 = async () => {
  const data = await getCurrentData(apiPath);

  const locationDatas = data.records.location;

  const tempIndex = 3;
  const cityIndex = 0;
  const townIndex = 2;

  const currentObj = locationDatas
  .filter(function(item) {
    return item.weatherElement[tempIndex].elementValue !== errorCode;
  })
  .reduce(function (prev, item) {
      return parseFloat(item.weatherElement[tempIndex].elementValue) <
        parseFloat(prev.weatherElement[tempIndex].elementValue)
        ? item
        : prev;
  });

  const { locationName, parameter, weatherElement, lat, lon } = currentObj;
  const answerArray = {
    縣市: parameter[cityIndex].parameterValue,
    行政區: parameter[townIndex].parameterValue,
    測站名稱: locationName,
    溫度: weatherElement[tempIndex].elementValue,
    座標: {
      lat: lat,
      lon: lon,
    }
  } 
  answers.push(answerArray);
  
};
