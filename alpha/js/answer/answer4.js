import { getCurrentData } from '../script.js';

const apiPath = 'api/v1/rest/datastore/F-D0047-089';
export const answer4 = async () => {
  const data = await getCurrentData(apiPath);

  const myCityIndex = 3;
  const locationIndex = 0;
  const elementIndex = 0;
  const weatherIndex = 3;
  const locationData = data.records.locations[locationIndex];
  const { weatherElement } = locationData.location[myCityIndex];

  const tempArray = weatherElement[weatherIndex].time;

  const maxTemp = Math.max(...tempArray.map((item) => item.elementValue[elementIndex].value));
  const minTemp = Math.min(...tempArray.map((item) => item.elementValue[elementIndex].value));

  const diff = [];
  function getDate(val) {
    return new Date(val).getDate();
  }

  const length = tempArray.length;

  for (let i = 0; i < length - 1; i++) {
    const next = tempArray[i].dataTime;
    const nextTemp = tempArray[i].elementValue[elementIndex].value;
    for (let j = 1; j < length; j++) {
      const prev = tempArray[j].dataTime;
      const prevTemp = tempArray[j].elementValue[elementIndex].value;

      if (getDate(prev) === getDate(next)) {
        const diffValue = Math.abs(prevTemp - nextTemp);
        diff.push(diffValue);
      }
    }
  }

  const maxDiff = Math.max(...diff);
  const answerObj = {
    最高溫: maxTemp,
    最低溫: minTemp,
    單日最大溫差: maxDiff,
  };

  return answerObj;
};
