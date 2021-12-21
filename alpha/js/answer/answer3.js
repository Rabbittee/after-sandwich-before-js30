import { getCurrentData, answers } from '../script.js';

const apiPath = 'api/v1/rest/datastore/O-A0002-001';
export const answer3 = async () => {
  const data = await getCurrentData(apiPath);

  const locationDatas = data.records.location;
  const dayMaxTempIndex = 6;
  const cityIndex = 0;
  const errorCode = '-999.00';

  const filterDatas = locationDatas.filter(
    (item) => item.weatherElement[dayMaxTempIndex].elementValue.toString() !== errorCode
  );

  filterDatas.sort(function (a, b) {
    const valueA = a.weatherElement[dayMaxTempIndex].elementValue;
    const valueB = b.weatherElement[dayMaxTempIndex].elementValue;
    return valueB - valueA;
  });

  const currentArray = [];

  for (let i = 0; i < 20; i++) {
    const j = 0;
    const { locationName, parameter, weatherElement, stationId } = filterDatas[i];

    const answerArray = {
      No: i + 1,
      測站名稱: locationName + stationId,
      降雨量: weatherElement[dayMaxTempIndex].elementValue,
    };
    const cityName = parameter[cityIndex].parameterValue;

    if (currentArray[cityName]) {
      currentArray[cityName].push(answerArray);
    } else {
      currentArray[cityName] = [{ ...answerArray }];
    }
  }
  answers.push({ ...currentArray });
};
