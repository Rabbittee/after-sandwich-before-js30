const baseURL = "https://opendata.cwb.gov.tw/api";
const token = "CWB-1E70461D-B346-4378-A55A-DB337F9BD7C5";
const apiPathA = "/v1/rest/datastore/O-A0001-001";
const apiPathB = "/v1/rest/datastore/F-D0047-063";
const weatherData = `${baseURL}${apiPathA}?Authorization=${token}`;
const taipeiWeek = `${baseURL}${apiPathB}?Authorization=${token}`;

fetch(weatherData)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    pullAlldata(data);
    findTempMin(data);
    findMountain(data);
    findRainTop(data);
  })
  .catch(function (err) {
    console.log(err);
  });

fetch(taipeiWeek)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    expectFutureMaxT(data);
  })
  .catch(function (err) {
    console.log(err);
  });

// All data
function pullAlldata(data) {
  const location = data.records.location;
  return location;
}

// -99 in this weather project mean no data
const noData = -99

// Exam One
function findTempMin(data) {
  const location = pullAlldata(data);
  const list = []

  for (const item of location) {
    // Destructuring
    const {
      lon: lon, 
      lat: lat, 
      locationName: locationName,
      time: {obsTime: time}
      } = item;
    const obj = { lon, lat, locationName, time };
    
    for (const param of item.parameter) {
      if ( param.parameterName === 'CITY' ) {
        const city = param.parameterValue
        obj.city = city
      } else if ( param.parameterName === "TOWN" ) {
        const town = param.parameterValue
        obj.town = town
      }
    }
    for (const param of item.weatherElement) {
      if ( param.elementName === "TEMP") {
        const temp = param.elementValue
        const newTemp = Number(temp)
        if ( newTemp !==  noData) {
          obj.newTemp = newTemp
        }
      }
    }
    list.push(obj)
  }
  // sort
  list.sort(function(a, b){
    return a.newTemp - b.newTemp
  })

  document.getElementById("examOne_answer").innerHTML = `
  <li><span>自動氣象站資料-無人自動站氣象資料</span></li>
  <li><span>觀測資料時間</span> ${list[0].time}</li>
  <li><span>縣市</span> ${list[0].city}</li>
  <li><span>鄉鎮</span> ${list[0].town}</li>
  <li><span>測站名稱</span> ${list[0].locationName}</li>
  <li><span>溫度</span><span> ${list[0].newTemp}</span></li>
  <li><span>緯度</span> ${list[0].lat}</li>
  <li><span>經度</span> ${list[0].lon}</li>
  `;
}

// Exam Two
function findMountain(data) {
  // Get data
  const location = pullAlldata(data);

  // Claen data
  const obj = {}
  for (const item of location ){
    for (const param of item.weatherElement) {
      if (param.elementName === 'ELEV') {
        const elev = Number(param.elementValue)
        if (elev !== noData) {
          const newElev = Math.floor(elev / 500) * 500
          obj.newElev = newElev
        }
      }
    }
    for (const param of item.parameter) {
      if ( param.parameterName === 'CITY' ) {
        const city = param.parameterValue
        obj.city = city
      } else if ( param.parameterName === "TOWN" ) {
        const town = param.parameterValue
        obj.town = town
      }
    }
    for (const param of item.weatherElement) {
      if ( param.elementName === "TEMP") {
        const temp = param.elementValue
        const newTemp = Number(temp)
        if ( newTemp !==  noData) {
          obj.newTemp = newTemp
        }
      }
    }
    console.log(obj)
  }
}

  // Deal data
  // const newArray = [five, one, oneFive, two, twoFive, three, threeFive, four];
  // const newArray = []
  // newArray.push(obj)

  // console.log()
  // const five = []; // 0 - 500
  // const one = []; // - 1000
  // const oneFive = []; // - 1500
  // const two = []; // - 2000
  // const twoFive = []; // - 2500
  // const three = []; // - 3000
  // const threeFive = []; // - 3500
  // const four = []; //8. - 4000

  // newArray.push(obj)
  // console.log(newArray)


  // for (i = 0; i < newArray.length; i++) {
  //   newArray[i].sort(function (a, b) {
  //     return a.temp - b.temp;
  //   });
  // }

  // document.getElementById("examTwo_answer").innerHTML = `
  // <li>500 公尺以下<span>     ${five[0].city} ${five[0].town} 溫度 ${five[0].temp}度 </span></li>
  // <li>500 - 1000公尺<span>  ${one[0].city} ${one[0].town} 溫度${one[0].temp}度 </span></li>
  // <li>1000 - 1500公尺<span> ${oneFive[0].city} ${oneFive[0].town} 溫度${oneFive[0].temp}度 </span></li>
  // <li>1500 - 2000公尺<span> ${two[0].city} ${two[0].town} 溫度${two[0].temp}度 </span></li>
  // <li>2000 - 2500公尺<span> ${twoFive[0].city} ${twoFive[0].town} 溫度${twoFive[0].temp}度 </span></li>
  // <li>2500 - 3000公尺<span> ${three[0].city} ${three[0].town} 溫度${three[0].temp}度 </span></li>
  // <li>3000 - 3500公尺<span> ${threeFive[0].city} ${threeFive[0].town} 溫度${threeFive[0].temp}度 </span></li>
  // <li>3500 公尺以上<span>${four[0].city} ${four[0].town} 溫度 ${four[0].temp}度 </span></li>
  // `;
// }

// Exam Three
function findRainTop(data) {
  // Get Data
  let pullAlldataArray = pullAlldata(data);
  let list = [];

  // Clean data
    for (const item of pullAlldataArray){
      const obj = {}
      const parameter = item.parameter
      for (const city of parameter ){
        if (city.parameterName === "CITY") {
          obj.city = city
        } 
      }
      const weatherElement = item.weatherElement
      for (const rain of weatherElement) {
        let topRain = Number(rain.elementValue)
        if (rain.elementName === 'H_24R' && topRain !== noData) {
          obj.topRain = topRain
        }
      }
      list.push(obj)
    }

    // Deal data
    list.sort(function (a, b) {
      return b.topRain - a.topRain;
    });

    // Render
    for (var i = 0; i < 20; i++) {
    list[i].rank = i + 1;
    document.getElementById("examThree_answer").innerHTML += `
    <li>
      <span class="rankList">
        ${list[i].rank} &ensp;
      </span>
        ${list[i].city.parameterName}
        ${list[i].city.parameterValue}
      <span class="lowTemp">
        ${list[i].topRain}
      <span>
    </li>
    `;
  }
}


// Exam Four
function expectFutureMaxT(data) {
  const weatherElement = data.records.locations[0].location[0].weatherElement;
  const maxDescription = weatherElement[12].description;
  const minDescription = weatherElement[8].description;
  const maxTempObject = weatherElement[12].time;
  const minTempObject = weatherElement[8].time;
  const maxTArray = [];
  const minTArray = [];
  const gapTArray = [];

  function findTheMaxT() {
    for (i = 0; i < maxTempObject.length; i++) {
      let maxTObjectValue = maxTempObject[i].elementValue[0].value;
      maxTArray.push(maxTObjectValue);
    }
    const max = Math.max(...maxTArray);
    return max;
  }

  function findTheMinT() {
    for (i = 0; i < minTempObject.length; i++) {
      let minTObjectValue = minTempObject[i].elementValue[0].value;
      minTArray.push(minTObjectValue);
    }
    const min = Math.min(...minTArray);
    return min;
  }
  const findTheMinTtemp = findTheMinT(data);
  const findTheMaxTtemp = findTheMaxT(data);

  function findTGap() {
    for (i = 0; i < maxTempObject.length; i++) {
      let maxTObjectValue = maxTempObject[i].elementValue[0].value;
      let minTObjectValue = minTempObject[i].elementValue[0].value;
      gapTArray.push(maxTObjectValue - minTObjectValue);
    }
    const max = Math.max(...gapTArray);
    return max;
  }
  let findTempGap = findTGap();

  document.getElementById("examFour_answer").innerHTML = `
  <li><span> 台北市/內湖區 </span></li>
  <li><span> 未來一週氣溫  </span></li>
  <li><span>${minDescription} </span><span> ${findTheMinTtemp} </span></li>
  <li><span>${maxDescription} </span><span> ${findTheMaxTtemp} </span></li>
  <li><span> 單日溫差最大 </span><span> 攝氏度 ${findTempGap}     </span></li>
  `;
}
