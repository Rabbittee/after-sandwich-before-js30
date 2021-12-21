import { getCurrentData, errorCode } from '../script.js';

const apiPath = 'api/v1/rest/datastore/O-A0001-001';
export const answer2 = async () => {
  const data = await getCurrentData(apiPath);

  const locationDatas = data.records.location;
  const tempIndex = 3;
  const cityIndex = 0;
  const townIndex = 2;
  const elevIndex = 0;

  const maxElev = Math.max(
    ...locationDatas.map((item) => {
      return item.weatherElement[elevIndex].elementValue;
    })
  );

  const tempArray = [];
  for (let i = 500; i - 500 < maxElev; i += 500) {
    let j = i - 500;
    if (j !== 0) j++ ;
    const currentObj = locationDatas
      .filter((item) => {
        return item.weatherElement[tempIndex].elementValue !== errorCode;
      })
      .filter((item) => {
        return (
          item.weatherElement[elevIndex].elementValue < i &&
          item.weatherElement[elevIndex].elementValue > j
        );
      })
      .reduce(function (prev, item) {
        return parseFloat(item.weatherElement[tempIndex].elementValue) <
          parseFloat(prev.weatherElement[tempIndex].elementValue)
          ? item
          : prev;
      });

      const { locationName, parameter, weatherElement, lat, lon } = currentObj;
      const answerArray = {
        海拔: `${j}~${i}`,
        縣市: parameter[cityIndex].parameterValue,
        行政區: parameter[townIndex].parameterValue,
        測站名稱: locationName,
        溫度: weatherElement[tempIndex].elementValue,
        座標: {
          lat: lat,
          lon: lon,
        }
      }
      tempArray.push(answerArray);
    }
    return tempArray;
};
