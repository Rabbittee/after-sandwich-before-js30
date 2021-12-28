let invalid = '-99';

// 驗證最低溫(Q1.)
const chkMinTemp = ( nextTemp , minTemp ) => {
  if ( nextTemp === invalid ) return false;

  if ( parseFloat( nextTemp ) > parseFloat( minTemp ) ) return false;
  
  return true;
};

const awaitFetch = async ( url ) => {
  return await fetch( url );
};

// promise
const getCurrentData = async () => {

  const answers = new Array(4).fill({});
  const cwbHost = "https://opendata.cwb.gov.tw";
  const apiPathArr = [ "api/v1/rest/datastore/O-A0001-001", "api/v1/rest/datastore/F-D0047-075" ];
  const paramsObj = {
    Authorization: "CWB-34AC2BFB-2272-41E3-84FE-AAF40C0C42AA",
  };
  const searchParams = new URLSearchParams(paramsObj);
  const response = await awaitFetch( `${cwbHost}/${apiPathArr[0]}?${searchParams.toString()}` );
  const data = await response.json();
  console.log(data);
  
  const responseQ4 = await awaitFetch( `${cwbHost}/${apiPathArr[1]}?${searchParams.toString()}` );
  const dataQ4 = await responseQ4.json();
  // console.log(dataQ4);
  

  // Q1 變數
  let minTemp = Infinity,city,town,name,lon,lat;
  // Q2 變數
  const minInfo = {
    0: {
      Location: '', // 觀測站
      Temporature: Infinity,       // 溫度
    },
    1: {
      Location: '', // 觀測站
      Temporature: Infinity,       // 溫度
    },
    2: {
      Location: '', // 觀測站
      Temporature: Infinity,       // 溫度
    },
    3: {
      Location: '', // 觀測站
      Temporature: Infinity,       // 溫度
    },
    4: {
      Location: '', // 觀測站
      Temporature: Infinity,       // 溫度
    },
    5: {
      Location: '', // 觀測站
      Temporature: Infinity,       // 溫度
    },
    6: {
      Location: '', // 觀測站
      Temporature: Infinity,       // 溫度
    },
    7: {
      Location: '', // 觀測站
      Temporature: Infinity,       // 溫度
    },
    8: {
      Location: '', // 觀測站
      Temporature: Infinity,       // 溫度
    },
  };

  // Q3 變數
  const rainObj = {};

  const recordLocArr = data.records.location;

  const showAnswers = recordLocArr.map( ( current, idx ) => {

    //
    // Q1.取全台當下最低溫
    //
    if ( minTemp === Infinity )
      minTemp = current.weatherElement[3].elementValue;
    
    else if( chkMinTemp( current.weatherElement[3].elementValue , minTemp ) )
    {
      minTemp = current.weatherElement[3].elementValue;
      city = current.parameter[0].parameterValue;
      town = current.parameter[2].parameterValue;
      name = current.locationName;
      lon = current.lon;
      lat = current.lat;
    }

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


    //
    // Q2.針對不同海拔高度找出最低溫測站，每500m一組
    //
    const heightLevel = parseInt( current.weatherElement[0].elementValue / 500 );
    
    ( ( heightLevel ) => {
      
      if ( current.weatherElement[3].elementValue !== invalid )
        minInfo[heightLevel].Temporature = Math.min( minInfo[heightLevel].Temporature , current.weatherElement[3].elementValue );
      
      if ( parseFloat( minInfo[heightLevel].Temporature ) === parseFloat( current.weatherElement[3].elementValue ) )
        minInfo[heightLevel].Location = current.locationName;

    } )( heightLevel );

   
    answers[1] = {
      "0-500": {
        "最低溫測站": minInfo[0].Location,
        "溫度": minInfo[0].Temporature,
      },
      "501-1000": {
        "最低溫測站": minInfo[1].Location,
        "溫度": minInfo[1].Temporature,
      },
      "1001-1500": {
        "最低溫測站": minInfo[2].Location,
        "溫度": minInfo[2].Temporature,
      },
      "1501-2000": {
        "最低溫測站": minInfo[3].Location,
        "溫度": minInfo[3].Temporature,
      },
      "2001-2500": {
        "最低溫測站": minInfo[4].Location,
        "溫度": minInfo[4].Temporature,
      },
      "2501-3000": {
        "最低溫測站": minInfo[5].Location,
        "溫度": minInfo[5].Temporature,
      },
      "3001-3500": {
        "最低溫測站": minInfo[6].Location,
        "溫度": minInfo[6].Temporature,
      },
      "3501-4000": {
        "最低溫測站": minInfo[7].Location,
        "溫度": minInfo[7].Temporature,
      },
      "4001-4500": {
        "最低溫測站": minInfo[7].Location || "No Location",
        "溫度": minInfo[7].Temporature || "No Temporature",
      },
    };

    //
    // Q3.近24小時降雨量前20名是哪個縣市、雨量分別為多少
    // 加總格式
    // {
    //   台北 : 0,
    //   桃園 : 0,
    //   ...
    // }
    
    if ( current.weatherElement[6].elementValue !== invalid )
    {
      let thisCity = current.parameter[0].parameterValue;
      let subTotal = 0;
      let nowRain = parseFloat( rainObj[thisCity] ) || 0;

      if ( thisCity in rainObj )
      { 
        nowRain = parseFloat( rainObj[thisCity] );
        subTotal = parseFloat( nowRain ) + parseFloat( current.weatherElement[6].elementValue );
        rainObj[thisCity] = subTotal;
      }
      else
        rainObj[thisCity] = parseFloat( current.weatherElement[6].elementValue );

    }

    // 重新定義物件格式
    const rainArr = Object.entries( rainObj );
    const newRainObj = [];
    const mapRainArr = rainArr.map( ( current , idx ) => {
      newRainObj.push( {thisCity:current[0], rainfall:current[1]} );

    } );
   

    // 陣列排序
    const newSortRainArr = newRainObj.sort(( idx1 , idx2 ) => {
     
      if ( parseFloat( idx1["rainfall"] ) > parseFloat( idx2["rainfall"] ) ) return -1

      else if ( parseFloat( idx1["rainfall"] ) < parseFloat( idx2["rainfall"] ) ) return 1

      else return 0;
      
    });
    // console.log(newSortRainArr);

    answers[2] = newSortRainArr;

  } );
  


  // 
  // Q4. 自己所在縣市-鄉鎮未來一週最低溫與最高溫？ 且單日溫差最大多少？
  //
  let wuchi = dataQ4.records.locations[0].location[28];
  const mintempObj = {};
  const maxtempObj = {};
  let weekMaxT,weekMinT;

  // min temporature loop
  const wuchiMinTArr = wuchi.weatherElement[8].time;
  const chkMin = wuchiMinTArr.map( ( current, idx ) => {
    
    if ( current.elementValue[0].value !== invalid )
    {
      let thisDate = current.startTime.substr( 0, 10 ); // 取日期
      let minT = current.elementValue[0].value; // 最低溫數值
      
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
    
  } );


  // max temporature loop
  const wuchiMaxTArr = wuchi.weatherElement[12].time;
  const chkMax = wuchiMaxTArr.map( ( current, idx ) => {
    
    if ( current.elementValue[0].value !== invalid )
    {
      let thisDate = current.startTime.substr( 0, 10 ); // 取日期
      let maxT = current.elementValue[0].value; // 最高溫數值
      
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
  
  } );
  // console.log(maxtempObj);
  // 重新定義格式
  const tempArr = Object.entries( mintempObj );
  let minusTemp,tempDifferent;
  // console.log(tempArr);
  const maptempArr = tempArr.map( ( current , idx ) => {
   
    minusTemp = maxtempObj[ current[0] ] - current[1]; // 溫差
    
    tempDifferent = ( tempDifferent === undefined ? minusTemp : ( tempDifferent > minusTemp ? tempDifferent : minusTemp ) ); // 存最大溫差
  } );
  
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