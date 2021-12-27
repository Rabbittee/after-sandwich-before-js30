// 驗證最低溫(Q1.)
const chkMinTemp = ( nextTemp , minTemp ) => {
  let isMinimalFlag = false;

  if ( parseFloat( nextTemp ) < parseFloat( minTemp ) && nextTemp != -99 )
    isMinimalFlag = true;
  
  return isMinimalFlag;
};

// promise
const getCurrentData = async () => {
  const answers = new Array(4).fill({});
  const cwbHost = "https://opendata.cwb.gov.tw";
  const apiPath = "api/v1/rest/datastore/O-A0001-001";
  let paramsObj = {
    Authorization: "CWB-34AC2BFB-2272-41E3-84FE-AAF40C0C42AA",
  };
  let searchParams = new URLSearchParams(paramsObj);
  const response = await fetch(
    `${cwbHost}/${apiPath}?${searchParams.toString()}`
  );
  
  const data = await response.json();
  // console.log(data);
  // console.log(data.records.location[0].weatherElement[3].elementValue);

  const apiPathForQ4 = "api/v1/rest/datastore/F-D0047-075";
  const responseQ4 = await fetch(
    `${cwbHost}/${apiPathForQ4}?${searchParams.toString()}`
  );
  const dataQ4 = await responseQ4.json();
  console.log(dataQ4);

  

  // Q1 變數
  let minTemp,city,town,name,lon,lat;
  // Q2 變數
  let minTemp500,minTemp1000,minTemp1500,minTemp2000,minTemp2500,minTemp3000,minTemp3500,minTemp4000,minTemp4500;
  let location500,location1000,location1500,location2000,location2500,location3000,location3500,location4000,location4500;
  // Q3 變數
  const rainObj = {};

  

  for ( let i=0 ; i<data.records.location.length ; i++ )
  {
    let nextLocation = data.records.location[i];
    
    //
    // Q1.取全台當下最低溫
    //
    if ( minTemp === undefined )
      minTemp = nextLocation.weatherElement[3].elementValue;
    
    if( minTemp != undefined && chkMinTemp( nextLocation.weatherElement[3].elementValue , minTemp ) )
    {
      minTemp = nextLocation.weatherElement[3].elementValue;
      city = nextLocation.parameter[0].parameterValue;
      town = nextLocation.parameter[2].parameterValue;
      name = nextLocation.locationName;
      lon = nextLocation.lon;
      lat = nextLocation.lat;
    }

    
    //
    // Q2.針對不同海拔高度找出最低溫測站，每500m一組
    //
    let height = nextLocation.weatherElement[0].elementValue;
    
    if ( height <= 500 )
    {
      if ( minTemp500 === undefined && location500 === undefined )
      {
        minTemp500 = nextLocation.weatherElement[3].elementValue;
        location500 = nextLocation.locationName;
      }

      if( chkMinTemp( nextLocation.weatherElement[3].elementValue , minTemp ) )
      {
        minTemp500 = nextLocation.weatherElement[3].elementValue;
        location500 = nextLocation.locationName;
      }
    }

    else if ( height > 500 && height <= 1000 )
    {
      if ( minTemp1000 === undefined && location1000 === undefined )
      {
        minTemp1000 = nextLocation.weatherElement[3].elementValue;
        location1000 = nextLocation.locationName;
      }
      
      if( chkMinTemp( nextLocation.weatherElement[3].elementValue , minTemp ) )
      {
        minTemp1000 = nextLocation.weatherElement[3].elementValue;
        location1000 = nextLocation.locationName;
      }
    }

    else if ( height > 1000 && height <= 1500 )
    {
      if ( minTemp1500 === undefined && location1500 === undefined )
      {
        minTemp1500 = nextLocation.weatherElement[3].elementValue;
        location1500 = nextLocation.locationName;
      }
      
      if( chkMinTemp( nextLocation.weatherElement[3].elementValue , minTemp ) )
      {
        minTemp1500 = nextLocation.weatherElement[3].elementValue;
        location1500 = nextLocation.locationName;
      }
    }

    else if ( height > 1500 && height <= 2000 )
    {
      if ( minTemp2000 === undefined && location2000 === undefined )
      {
        minTemp2000 = nextLocation.weatherElement[3].elementValue;
        location2000 = nextLocation.locationName;
      }
      
      if( chkMinTemp( nextLocation.weatherElement[3].elementValue , minTemp ) )
      {
        minTemp2000 = nextLocation.weatherElement[3].elementValue;
        location2000 = nextLocation.locationName;
      }
    }

    else if ( height > 2000 && height <= 2500 )
    {
      if ( minTemp2500 === undefined && location2500 === undefined )
      {
        minTemp2500 = nextLocation.weatherElement[3].elementValue;
        location2500 = nextLocation.locationName;
      }
      
      if( chkMinTemp( nextLocation.weatherElement[3].elementValue , minTemp ) )
      {
        minTemp2500 = nextLocation.weatherElement[3].elementValue;
        location2500 = nextLocation.locationName;
      }
    }

    else if ( height > 2500 && height <= 3000 )
    {
      if ( minTemp3000 === undefined && location3000 === undefined )
      {
        minTemp3000 = nextLocation.weatherElement[3].elementValue;
        location3000 = nextLocation.locationName;
      }
      
      if( chkMinTemp( nextLocation.weatherElement[3].elementValue , minTemp ) )
      {
        minTemp3000 = nextLocation.weatherElement[3].elementValue;
        location3000 = nextLocation.locationName;
      }
    }

    else if ( height > 3000 && height <= 3500 )
    {
      if ( minTemp3500 === undefined && location3500 === undefined )
      {
        minTemp3500 = nextLocation.weatherElement[3].elementValue;
        location3500 = nextLocation.locationName;
      }
      
      if( chkMinTemp( nextLocation.weatherElement[3].elementValue , minTemp ) )
      {
        minTemp3500 = nextLocation.weatherElement[3].elementValue;
        location3500 = nextLocation.locationName;
      }
    }
    
    else if ( height > 3500 && height <= 4000 )
    {
      if ( minTemp4000 === undefined && location4000 === undefined )
      {
        minTemp4000 = nextLocation.weatherElement[3].elementValue;
        location4000 = nextLocation.locationName;
      }
      
      if( chkMinTemp( nextLocation.weatherElement[3].elementValue , minTemp ) )
      {
        minTemp4000 = nextLocation.weatherElement[3].elementValue;
        location4000 = nextLocation.locationName;
      }
    }

    else if ( height > 4000 && height <= 4500 )
    {
      if ( minTemp4500 === undefined && location4500 === undefined )
      {
        minTemp4500 = nextLocation.weatherElement[3].elementValue;
        location4500 = nextLocation.locationName;
        
      }
      
      if( chkMinTemp( nextLocation.weatherElement[3].elementValue , minTemp ) )
      {
        minTemp4500 = nextLocation.weatherElement[3].elementValue;
        location4500 = nextLocation.locationName;
      }
    }



    //
    // Q3.近24小時降雨量前20名是哪個縣市、雨量分別為多少
    // 加總格式
    // {
    //   台北 : 0,
    //   桃園 : 0,
    //   ...
    // }
    
    if ( nextLocation.weatherElement[6].elementValue != -99 )
    {
      let thisCity = nextLocation.parameter[0].parameterValue;
      let subTotal = 0;
      let nowRain = parseFloat( rainObj[thisCity] ) || 0;

      if ( thisCity in rainObj )
      { 
        nowRain = parseFloat( rainObj[thisCity] );
        subTotal = parseFloat( nowRain ) + parseFloat( nextLocation.weatherElement[6].elementValue );
        rainObj[thisCity] = subTotal;
      }
      else
        rainObj[thisCity] = parseFloat( nextLocation.weatherElement[6].elementValue );
      
     
    }

  } // for loop end


// 
// Q4. 自己所在縣市-鄉鎮未來一週最低溫與最高溫？ 且單日溫差最大多少？
//
let wuchi = dataQ4.records.locations[0].location[28];
const mintempObj = {};
const maxtempObj = {};
let weekMaxT,weekMinT;

// min temp loop
for ( let j=0 ; j<wuchi.weatherElement[8].time.length ; j++ )
{
  if ( wuchi.weatherElement[8].time[j].elementValue[0].value != -99 )
  {
    let thisDate = wuchi.weatherElement[8].time[j].startTime.substr( 0, 10 ); // 取日期
    let minT = wuchi.weatherElement[8].time[j].elementValue[0].value; // 最低溫數值
    
    weekMinT = ( weekMinT === undefined ? minT : ( weekMinT < minT ? weekMinT : minT ) ); // 存當週最低溫

    // 判斷物件內是否有此日期
    if( thisDate in mintempObj )
    {
      // 比較低溫
      mintempObj[thisDate].MinT = ( mintempObj[thisDate].MinT < minT ? mintempObj[thisDate].MinT : minT );
    }
    else
      mintempObj[thisDate] = minT;
  }
  
} //  min temp loop end

// max temp loop
for ( let k=0 ; k<wuchi.weatherElement[12].time.length ; k++ )
{
  if ( wuchi.weatherElement[12].time[k].elementValue[0].value != -99 )
  {
    let thisDate = wuchi.weatherElement[12].time[k].startTime.substr( 0, 10 ); // 取日期
    let maxT = wuchi.weatherElement[12].time[k].elementValue[0].value; // 最高溫數值
    
    weekMaxT = ( weekMaxT === undefined ? maxT : ( weekMaxT > maxT ? weekMaxT : maxT ) ); // 存當週最高溫

    // 判斷物件內是否有此日期
    if( thisDate in maxtempObj )
    {
      // 比較高溫
      maxtempObj[thisDate].MaxT = ( maxtempObj[thisDate].MaxT > maxT ? maxtempObj[thisDate].MaxT : maxT );
    }
    else
      maxtempObj[thisDate] = maxT;
  }
  
} //  max temp loop end

// console.log(maxtempObj);
// console.log(mintempObj);




  // Q1.取全台當下最低溫
  answers[0] = {
    city: city,
    town: town,
    name: name,
    temp: minTemp,
    location: {
      lon: lon,
      lat: lat,
    },
  };

  // Q2.針對不同海拔高度找出最低溫測站，每500m一組
  answers[1] = {
    "0-500": {
      "最低溫測站": location500,
      "溫度": minTemp500,
    },
    "501-1000": {
      "最低溫測站": location1000,
      "溫度": minTemp1000,
    },
    "1001-1500": {
      "最低溫測站": location1500,
      "溫度": minTemp1500,
    },
    "1501-2000": {
      "最低溫測站": location2000,
      "溫度": minTemp2000,
    },
    "2001-2500": {
      "最低溫測站": location2500,
      "溫度": minTemp2500,
    },
    "2501-3000": {
      "最低溫測站": location3000,
      "溫度": minTemp3000,
    },
    "3001-3500": {
      "最低溫測站": location3500,
      "溫度": minTemp3500,
    },
    "3501-4000": {
      "最低溫測站": location4000,
      "溫度": minTemp4000,
    },
    "4001-4500": {
      "最低溫測站": location4500 || "no Temporature",
      "溫度": minTemp4500 || "no Location",
    },
  };
  
  // Q3.近24小時降雨量前20名是哪個縣市、雨量分別為多少
  // 重新定義格式
  const rainArr = Object.entries( rainObj );
  const newRainObj = [];
  rainArr.forEach(([key, val]) => {
		newRainObj.push( {thisCity:key, rainfall:val} );
  });

  // 陣列排序
  const newSortRainArr = newRainObj.sort(( idx1 , idx2 ) => {
      return parseFloat( idx1["rainfall"] ) > parseFloat( idx2["rainfall"] ) ? -1 : ( parseFloat( idx1["rainfall"] ) < parseFloat( idx2["rainfall"] ) ? 1 : 0 );
  });
  // console.log(newSortRainArr);

  answers[2] = newSortRainArr;
  
  

  // Q4.自己所在縣市-鄉鎮未來一週最低溫與最高溫？ 且單日溫差最大多少？
  // 重新定義格式
  const tempArr = Object.entries( mintempObj );
  const newTempObj = [];
  let minusTemp,tempDifferent;

  tempArr.forEach(([key, val]) => {
    minusTemp = maxtempObj[key] - val; // 溫差
    tempDifferent = ( tempDifferent === undefined ? minusTemp : ( tempDifferent > minusTemp ? tempDifferent : minusTemp ) ); // 存最大溫差
    console.log(tempDifferent);
  });
 
  answers[3] = {
    "縣市-鄉鎮" : "台中市梧棲區",
    "未來一週最高溫" : weekMaxT,
    "未來一週最低溫" : weekMinT,
    "未來一週單日最大溫差" : tempDifferent,
  } 






  answers.forEach((answer, index) => {
    const answer_node = document.getElementById(`answer_${index + 1}`);
    const showText = JSON.stringify(answer, null, "    ");
    answer_node.rows = showText.split('\n').length;
    answer_node.value = showText;
  })
};


getCurrentData();