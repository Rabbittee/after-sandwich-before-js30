// import question01 from './question01.js'

const getCurrentData = async () => {
  const cwbHost = "https://opendata.cwb.gov.tw";
  const apiPath = "api/v1/rest/datastore/O-A0001-001";
  let paramsObj = {
    // TODO: before push cancel the //
    Authorization: "CWB-34AC2BFB-2272-41E3-84FE-AAF40C0C42AA",
    // Authorization: "CWB-58F87371-93FB-4EFF-B4E0-63DFB26954F0"
  };
  let searchParams = new URLSearchParams(paramsObj);
  const response = await fetch(
    `${cwbHost}/${apiPath}?${searchParams.toString()}`
  );

  const data = await response.json();
  console.log('data: ', data);
  answer01(data)
  // answer02(data)
};

const answer01 = function(data) {
  let locationArr = data.records.location;
  let lowestTempData = {};
  let lowestTemp = '';
  locationArr.forEach((item) => {
    if ( lowestTemp === '' && lowestTemp !== '-99') {
      lowestTemp = item.weatherElement[3].elementValue
    }
    if (lowestTemp > item.weatherElement[3].elementValue && lowestTemp !== '-99') {
      lowestTemp = item.weatherElement[3].elementValue
      lowestTempData = {
        city: item.parameter[0].parameterValue,
        town: item.parameter[2].parameterValue,
        name: item.locationName,
        temp: item.weatherElement[3].elementValue,
        location: {
          lon: item.lon,
          lat: item.lat
        }
      }
    }
  })
  console.log('answer01: ', lowestTempData);
}

const answer02 = function(data) {
  // 1. 分組，五百公尺一組
  // 2. 把取到的資料，塞進去五百公尺一組的資料裡面
  // 3. 取其最低溫
  let initialData = {
    '0-500': { name: '測溫站', temp: '20' },
    '500-1000': { name: '測溫站', temp: '20' }
  }
  let altitudeArr = [];
  for(let i = 0; i <= 8; i+=1 ) {
    
    altitudeArr.push(i)
  }
}

getCurrentData();

const answers = new Array(4).fill({});
answers[0] = {
  city: "STRING",
  town: "STRING",
  name: "STRING",
  temp: 0,
  location: {
    lon: 0,
    lat: 0,
  },
};

// TODO: 把答案渲染
// console.log('answers: ', answers[0]);
answers.forEach((answer, index) => {
  const answer_node = document.getElementById(`answer_${index + 1}`);
  const showText = JSON.stringify(answer, null, "    ");
  answer_node.rows = showText.split('\n').length;
  answer_node.value = showText;
})
