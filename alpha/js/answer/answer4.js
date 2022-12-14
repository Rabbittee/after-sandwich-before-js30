import { getCurrentData } from "../fetch.js";
import {
  getElementTimeArray,
  getLocationValue,
  getMyLocationValue,
  getTimeTempValue,
} from "../utils.js";
import {
  city,
  town,
  tempPrediction,
  myCity,
  locationName,
  Authorization,
} from "../global.js";

const apiPath = "F-D0047-089";
const paramsObj = {
  Authorization,
  parameterName: [city, town],
  elementName: tempPrediction,
};

/**
 * 找出所在縣市的未來最高溫跟最低溫以及最大單日溫差
 * @returns {object}
 */

export const answer4 = async () => {
  const data = await getCurrentData(apiPath, paramsObj);
  const locationData = getLocationValue(data.records.locations, locationName);
  const myLocationData = getMyLocationValue(locationData, myCity);
  const tempData = getElementTimeArray(
    myLocationData.weatherElement,
    tempPrediction
  );

  const getDate = (time) => new Date(time).getDate();

  //group by date
  const groupBy = (array) =>
    Object.entries(
      array.reduce((acc, cur) => {
        const date = getDate(cur.dataTime);

        acc[date] === undefined
          ? (acc[date] = [])
          : acc[date].push(getTimeTempValue(cur.elementValue));
        return acc;
      }, {})
    );

  //get each date diff maximum put in array
  const diffArray = groupBy(tempData)
    .map(([date, arr]) => {
      const getMaxDiff = (arr) => {
        const max = Math.max(...arr);
        const min = Math.min(...arr);
        return { diff: max - min };
      };
      return {
        ...date,
        ...getMaxDiff(arr),
      };
    })
    .map((item) => item.diff);

  //get max temperature
  const maxTemp = Math.max(
    ...tempData.map((item) => getTimeTempValue(item.elementValue))
  );

  //get min temperature
  const minTemp = Math.min(
    ...tempData.map((item) => getTimeTempValue(item.elementValue))
  );

  //get maximum in array
  const maxDiff = Math.max(...diffArray);
  const answer = {
    縣市: myCity,
    最高溫: maxTemp,
    最低溫: minTemp,
    單日最大溫差: maxDiff,
  };

  return answer;
};
