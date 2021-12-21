import { getCurrentData, errorCode, answers } from '../script.js';

const apiPath = 'api/v1/rest/datastore/F-D0047-089';
export const answer4 = async () => {
  const data = await getCurrentData(apiPath);
  console.log(data);

  const myCityIndex = 3;
  const locationIndex = 0;
  const elementIndex = 0;
  const weatherIndex = 3;
  const locationDatas = data.records.locations[locationIndex];
  const { weatherElement } = locationDatas.location[myCityIndex];

  const tempArray = weatherElement[weatherIndex].time;

  const maxTemp = Math.max(...tempArray.map((item) => item.elementValue[elementIndex].value));
  const minTemp = Math.min(...tempArray.map((item) => item.elementValue[elementIndex].value));

  const dif = [];
  function getDate(val) {
    return new Date(val).getDate();
  }

  const leng = tempArray.length;

  for (let i = 0; i < leng - 1; i++) {
    const next = tempArray[i].dataTime;
    const nextTemp = tempArray[i].elementValue[elementIndex].value;
    for (let j = 1; j < leng; j++) {
      const prev = tempArray[j].dataTime;
      const prevTemp = tempArray[j].elementValue[elementIndex].value;
      let difValue = 0;
      if (getDate(prev) === getDate(next)) {
        difValue = Math.abs(prevTemp - nextTemp);
        dif.push(difValue);
      }
    }
  }

  const maxDif = Math.max(...dif);
  const answerObj = {
    最高溫: maxTemp,
    最低溫: minTemp,
    單日最大溫差: maxDif,
  };

  answers.push(answerObj);
};
