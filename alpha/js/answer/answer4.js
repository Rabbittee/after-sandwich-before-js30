import { getCurrentData, token } from "../fetch.js";
import {
  getElementTimeArray,
  getLocationValue,
  getMyLocationValue,
  getTimeTempValue,
} from "../utils.js";
import { city, town, tempPrediction, myCity, locationName } from "../global.js";

const apiPath = "F-D0047-089";
const { Authorization } = token;
const paramsObj = {
  Authorization: Authorization,
  parameterName: [city, town],
  elementName: tempPrediction,
};

export const answer4 = async () => {
  const data = await getCurrentData(apiPath, paramsObj);
  const locationData = getLocationValue(data.records.locations, locationName);
  const myLocationData = getMyLocationValue(locationData, myCity);
  const tempData = getElementTimeArray(
    myLocationData.weatherElement,
    tempPrediction
  );


  const getDate = (time) => new Date(time).getDate();

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

  const maxTemp = Math.max(
    ...tempData.map((item) => getTimeTempValue(item.elementValue))
  );
  const minTemp = Math.min(
    ...tempData.map((item) => getTimeTempValue(item.elementValue))
  );

  const maxDiff = Math.max(...diffArray);
  const answer = {
    最高溫: maxTemp,
    最低溫: minTemp,
    單日最大溫差: maxDiff,
  };

  return answer;
};
