const getCurrentData = async () => {
  const cwbHost = 'https://opendata.cwb.gov.tw';
  const apiPath = 'api/v1/rest/datastore/O-A0001-001';
  let paramsObj = {
    Authorization: 'CWB-34AC2BFB-2272-41E3-84FE-AAF40C0C42AA',
  };
  let searchParams = new URLSearchParams(paramsObj);
  const response = await fetch(`${cwbHost}/${apiPath}?${searchParams.toString()}`);

  const data = await response.json();
  console.log(data);

  const answerOne = data.records.location.reduce(function (res, obj) {
    return parseFloat(obj.weatherElement[3].elementValue) <
      parseFloat(res.weatherElement[3].elementValue) && obj.weatherElement[3].elementValue !== '-99'
      ? obj
      : res;
  });
  max = Math.max(...data.records.location.map((item) => item.weatherElement[0].elementValue));
  answers[0] = {
    city: answerOne.parameter[0].parameterValue,
    town: answerOne.parameter[2].parameterValue,
    name: answerOne.locationName,
    temp: answerOne.weatherElement[3].elementValue,
    location: {
      lon: answerOne.lon,
      lat: answerOne.lat,
    },
  };

  console.log(max);
  console.log(answerOne);

  //two
  let answerTwo = [];
  for (let i = 500; i - 500 < max; i += 500) {
    const j = i - 500;
    const answerTwoArray = data.records.location.filter(function (item) {
      return (
        item.weatherElement[0].elementValue < i &&
        item.weatherElement[0].elementValue > j &&
        item.weatherElement[3].elementValue.toString() !== '-99'
      );
    });
    const answerTwoT = answerTwoArray.reduce(function (res, obj) {
      return parseFloat(obj.weatherElement[3].elementValue) <
        parseFloat(res.weatherElement[3].elementValue)
        ? obj
        : res;
    });
    const answerTwoRes = {
      city: answerTwoT.parameter[0].parameterValue,
      town: answerTwoT.parameter[2].parameterValue,
      name: answerTwoT.locationName,
      temp: answerTwoT.weatherElement[3].elementValue,
      EVE: answerTwoT.weatherElement[0].elementValue,
    };
    answerTwo.push(answerTwoRes);
  }
  answers[1] = answerTwo;
  console.log(answerTwo);

  render();
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
  )
  const maxTemp = data.records.locations[0].location[16].weatherElement[12]
  const minTemp = data.records.locations[0].location[16].weatherElement[8]
  const arry = []
  for (let i = 0 ; i < maxTemp.time.length; i++) {
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

const answers = new Array(4).fill({});
getCurrentData();
getCurrenDataForThree();
getCurrenDataForFour();

function render() {
  answers.forEach((answer, index) => {
    const answer_node = document.getElementById(`answer_${index + 1}`);
    const showText = JSON.stringify(answer, null, '    ');
    answer_node.rows = showText.split('\n').length;
    answer_node.value = showText;
  });
}
