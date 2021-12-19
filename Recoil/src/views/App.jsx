
import Task from "../components/Task"
import clsx from "clsx"
import {useWeatherAPI} from "./hooks"


function getTop(quantity,cb,series){
  const data = sort(cb ,series);
  return data.slice(0,quantity)
}
function reduce(cb,series,init=null){
  return series.reduce(cb,init)
}
function sort(cond,series){
  return series.sort(cond)
}
const compose = (enhance,func) => enhance(func);


class StationInfo{
  constructor({locationName,lat,lon,weatherElement,time,parameter}){
    this.name = locationName;
    this.geoLocation = {lat,lon};
    this.distriction = reduce((acc,val)=>({...acc,[val.parameterName]:val.parameterValue}),parameter,{});
    this.weather = reduce((acc,val)=>({...acc,[val.elementName]:val.elementValue}),weatherElement,{});
    this.time = time;
  }
  get info(){
    return {
     ...this
    }
  }
}
function find(data){
  return function (cond){
    return reduce(cond,data);
  }
}

const toFormat = (to,series) => series.map(to);

function QuestionOne(){
  const data = useWeatherAPI("O-A0001-001",{elementName:['TEMP']});
  if(!data) return (<div>loading</div>)
  const stationSeries = toFormat(station=>new StationInfo(station),data.location).filter(station=>
    Number(station.weather.TEMP) !== -99
  );
  const getLowestTempTempStation = find(stationSeries);
  const station = getLowestTempTempStation((acc,val)=>{
    if(acc !== null){
      const newTemp = val.weather.TEMP;
      const preTemp = acc.weather.TEMP;
      if( Number(newTemp) < Number(preTemp)) return val
      return acc
    }
    return val
  });
  return (
    <>
      <Task.Question
          title="題目一:"
          task={()=>(<>
            找到全台當下最低溫的點，並列出
            <span className="bg-blue-900 text-white">縣市</span>
            <span className="bg-blue-900 text-white">行政區</span>
            <span className="bg-blue-900 text-white">測站名稱</span>
            <span className="bg-blue-900 text-white">溫度</span>
            <span className="bg-blue-900 text-white">座標</span>
            <small className="block">(透過中央氣象局ＡＰＩ取得全台測站即時資料)</small>
            <small className="block">(API: v1/rest/datastore/O-A0001-001)</small>
          </>)}
        />
        <Task.Anwser title="當下最低溫的點">
          {data.location.length !== 0 ? JSON.stringify(station) : "咦!?我的答案跑去哪了"}
        </Task.Anwser>
    </>
  )
}



const handleClassify = (acc,val) => {
  const elevation = Math.ceil(val.weather.ELEV/500) * 500;
  const range =  `${elevation-500}-${elevation}`;
  if(!acc.hasOwnProperty(range)){
    return {
      ...acc,
      [range]: [val]
    }
  }
  return {
    ...acc,
    [range]: [ ...acc[range], val]
  }
}


function findStations(cond,series){
  const filterStation = (data) =>{ 
    const series = Object.entries(data);
    return series.map(([key,list])=>{
      return [key,reduce(cond,list,list[0])]
    })
  }
  return compose(filterStation,reduce(handleClassify,series,{}));
}

function QuestionTwo(){
  const data = useWeatherAPI("O-A0001-001",{elementName:['ELEV','TEMP']});
  if(!data) return (<div>loading</div>)
  const stationSeries = toFormat(station => 
      new StationInfo(station),
      data.location
    ).filter(station=>
      Number(station.weather.TEMP) !== -99
    );
  const lowestTempEach500 = findStations((acc,val)=>val.weather.TEMP < acc.weather.TEMP ? val : acc,stationSeries);
  return (
    <>
      <Task.Question
        title="題目二:"
        task={()=>(<>
          同上，針對不同海拔高度找出最低溫測站，每<span className="bg-blue-900 text-white">500m</span>
          一組，並回傳object<small className="block">(API: v1/rest/datastore/O-A0001-001)</small>
        </>)}
      />
      {
        data.location.length  ? lowestTempEach500.map(([key,station])=>(
          <Task.Anwser title={key}>
            <span>{ JSON.stringify(station)}</span>
          </Task.Anwser>
        )): (
          <Task.Anwser>
            可惡!第二題要找的測站也被偷走了
          </Task.Anwser>
        )
      }
    </>
  )
}


 
const ascendingOrder = (pre,val)=> Number(val.weather.HOUR_24) - Number(pre.weather.HOUR_24)
const counter = (acc,val)=>{
  const cityName = val.distriction.CITY
  if(!acc.hasOwnProperty(cityName)){
    return {
      [cityName]: [val],
      ...acc
    } 
  }
  return {
    ...acc,
    [cityName]:[...acc[cityName],val]
  }
}

function QuestionThree(){
  const data = useWeatherAPI("O-A0002-001",{elementName:['HOUR_24']});
  if(!data) return (<div>loading</div>)
  const stationSeries = toFormat(station => 
    new StationInfo(station),
    data.location
  ).filter(station=>
    Number(station.weather.TEMP) !== -99
  );
  const top20 = getTop(20,ascendingOrder,stationSeries);
  const topList = top20.map(sensor=>(<div>{sensor.name}: {sensor.weather.HOUR_24}</div>));
  const distriction = reduce(counter,top20,{});
  const count = Object.keys(distriction).map(key => (<div>{key}: {distriction[key].length}</div>));
  return (
    <>
      <Task.Question
        title="題目三:格式自己定辣，我懶"
        task={()=>(<>
          近<span className="bg-blue-900 text-white">24小時</span>降雨量
          <span className="bg-blue-900 text-white">前20名</span>是哪些？<br/>
          分別統計整理列在哪些<span className="bg-blue-900 text-white">縣市</span>？
          <small className="block">HOUR_24欄位為近24小時的累積降雨量</small>
          <small className="block">(API: /v1/rest/datastore/O-A0002-001)</small>
        </>)}
      />
      <Task.Anwser title="近24小時降雨量前20名:">
        {topList}
      </Task.Anwser>
      <Task.Anwser title="前20名分佈於:">
        {count}
      </Task.Anwser>
    </>
  )
}



function getCountryInfo(data){
  return function (locationName){
    return data.location.find(distribute=>distribute.locationName===locationName)
  }
}

function QuestionFour(){
  const data = useWeatherAPI("F-D0047-051",{elementName:['MaxT','MinT']});
  if(!data) return (<div>loading</div>)
  const counter = getCountryInfo(data.locations[0]);
  const distriction = counter("安樂區");
  const minTempSeries = distriction.weatherElement[0].time;
  const maxTempSeries = distriction.weatherElement[1].time;
  const minTemp = Math.min(...minTempSeries.map(point=>point.elementValue[0].value)) 
  const maxTemp = Math.max(...maxTempSeries.map(point=>point.elementValue[0].value)) 

  const tempDiffSeries = maxTempSeries.map((point,index)=>point.elementValue[0].value - minTempSeries[index].elementValue[0].value);
  const maxTempDiff = Math.max(...tempDiffSeries);
  return (
    <>
      <Task.Question
        title="題目四:格式自己定辣，我懶"
        task={()=>(<>
          自己所在的縣市-鄉鎮，未來一週的<span className="bg-blue-900 text-white">最低溫</span>與
          <span className="bg-blue-900 text-white">最高溫</span>分別為多少？<br/>
          且<span className="bg-blue-900 text-white">單日溫差</span>最大為多少？
          <small className="block">(API: ​/v1​/rest​/datastore​/F-D0047-00XX系列)</small>
        </>)}
      />
      <Task.Anwser title="未來一週的最低溫與最高溫:">
        {`最低溫:${minTemp}°C\n最高溫:${maxTemp}°C`}
      </Task.Anwser>
      <Task.Anwser title="單日溫差最大為:">
      {`${maxTempDiff}°C`}
      </Task.Anwser>
    </>
  )
}

function App() {
  return (
    <div className="App">
      <main
        className={clsx(
          "flex flex-col",
          "w-screen max-w-3xl",
          "mx-auto my-16 space-y-6"
        )}
      >
        <h4 className="text-2xl font-black">JS讀書會後測啦</h4>
        <QuestionOne/>
        <QuestionTwo/>
        <QuestionThree/>
        <QuestionFour/>
      </main>
    </div>
  )
}

export default App
