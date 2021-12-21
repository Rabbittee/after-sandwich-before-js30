const cwbHost = 'https://opendata.cwb.gov.tw';
// const apiPath = 'api/v1/rest/datastore/O-A0001-001';
const paramsObj = {
  Authorization: 'CWB-34AC2BFB-2272-41E3-84FE-AAF40C0C42AA',
};
export const errorCode = '-99';

export async function getCurrentData(apiPath) {
  const searchParams = new URLSearchParams(paramsObj);
  const response = await fetch(`${cwbHost}/${apiPath}?${searchParams.toString()}`);

  const data = await response.json();
  console.log(data)
  return data;
};


const getCurrenDataForThree = async () => {
  const cwbHost = 'https://opendata.cwb.gov.tw';
  const apiPath = 'api/v1/rest/datastore/O-A0002-001';
  let paramsObj = {
    Authorization: 'CWB-34AC2BFB-2272-41E3-84FE-AAF40C0C42AA',
  };
  let searchParams = new URLSearchParams(paramsObj);
  const response = await fetch(`${cwbHost}/${apiPath}?${searchParams.toString()}`);

  const data = await response.json();
  console.log(data);
  const answerThree = [];

  data.records.location
    .sort(function (a, b) {
      return a.weatherElement[6].elementValue - b.weatherElement[6].elementValue;
    })
    .reverse();
  for (let i = 0; i < 20; i++) {
    const result = data.records.location[i];
    const answerThreeObj = {
      city: result.parameter[0].parameterValue,
      location: result.locationName,
      rain: result.weatherElement[6].elementValue,
    };
    answerThree.push(answerThreeObj);
  }
  answers[2] = answerThree;
  render();
};

const getCurrenDataForFour = async () => {
  const cwbHost = 'https://opendata.cwb.gov.tw';
  const apiPath = 'api/v1/rest/datastore/F-D0047-071';
  let paramsObj = {
    Authorization: 'CWB-34AC2BFB-2272-41E3-84FE-AAF40C0C42AA',
  };
  let searchParams = new URLSearchParams(paramsObj);
  const response = await fetch(`${cwbHost}/${apiPath}?${searchParams.toString()}`);

  const data = await response.json();
  console.log(data);

  const fourFirst = Math.max(
    ...data.records.locations[0].location[16].weatherElement[12].time.map(
      (item) => item.elementValue[0].value
    )
  );
  const fourSecond = Math.min(
    ...data.records.locations[0].location[16].weatherElement[8].time.map(
      (item) => item.elementValue[0].value
    )
  );
  const maxTemp = data.records.locations[0].location[16].weatherElement[12];
  const minTemp = data.records.locations[0].location[16].weatherElement[8];
  const arry = [];
  for (let i = 0; i < maxTemp.time.length; i++) {
    const dif = maxTemp.time[i].elementValue[0].value - minTemp.time[i].elementValue[0].value;
    arry.push(dif);
  }
  const fourThird = Math.max(...arry);
  const answerFour = {
    maxTemp: fourFirst,
    minTemp: fourSecond,
    dif: fourThird,
  };
  answers[3] = answerFour;
  render();
};

export const answers = new Array();
console.log(answers)


export function render() {
  answers.forEach((answer, index) => {
    const answer_node = document.getElementById(`answer_${index + 1}`);
    const showText = JSON.stringify(answer, null, '    ');
    answer_node.rows = showText.split('\n').length;
    answer_node.value = showText;
  });
}
