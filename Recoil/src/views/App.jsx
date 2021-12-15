import { useEffect, useState,useCallback } from 'react'
import Task from "../components/Task"
import clsx from "clsx"
import {queryCwb} from "../api/api"


class Station{
  constructor({locationName,lat,lon,weatherElement,time,parameter}){
    this.name = locationName;
    this.geoLocation = {lat,lon};
    this.distriction = parameter.reduce((acc,val)=>({...acc,[val.parameterName]:val.parameterValue}),{});
    this.weather = weatherElement.reduce((acc,val)=>({...acc,[val.elementName]:val.elementValue}),{});
    this.time = time;
  }
  get info(){
    return {
     ...this
    }
  }
}

function useWeatherAPI(path,body){
  const [series,setSeries] = useState(null);
  const api = useCallback(async()=>{
    const result = await queryCwb(path, body);
    setSeries(result.records)
  },[]);
  useEffect(api,[api])
  return series
}

function useReduce(cb,series,init=null){
  return series.reduce(cb,init)
}
function useSort(cond,series){
  return series.sort(cond)
}
const useCompose = (enhance,func) => enhance(func);

function QuestionOne(){
  const data = useWeatherAPI("O-A0001-001",{elementName:['TEMP']});
  if(!data) return (<div>loading</div>)
  const station = useReduce((acc,val)=>{
    if(acc !== null){
      const newTemp = val.weatherElement[0].elementValue;
      const preTemp = acc.weatherElement[0].elementValue;
      if( Number(newTemp) === -99 ) return acc
      if( Number(newTemp) < Number(preTemp)) return val
      return acc
    }
    return val
  },data.location);
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
          {JSON.stringify(new Station(station))}
        </Task.Anwser>
    </>
  )
}



const handleClassify = (acc,val)=>{
  const elevation = Math.ceil(val.weatherElement[0].elementValue/500) * 500;
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

const filterStation = (data) =>{ 
  const series = Object.entries(data);
  return series.map(([key,list])=>{
    const getLowest = (acc,val)=>{
      return val.weatherElement[1].elementValue < acc.weatherElement[1].elementValue ? val : acc
    }
    return [key,useReduce(getLowest,list,list[0])]
  })
}
function QuestionTwo(){
  const data = useWeatherAPI("O-A0001-001",{elementName:['ELEV','TEMP']});
  if(!data) return (<div>loading</div>)
  const filterError = (data) => data.filter(station=> Number(station.weatherElement[1].elementValue) !== -99)
  const lowestStations = useCompose(
    filterStation,
    useReduce(
      handleClassify,
      filterError(data.location),
      {})
  );
    // console.log(lowestStations)
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
      lowestStations.map(([key,station])=>(
        <Task.Anwser title={key}>
          <span>{ JSON.stringify(new Station(station))}</span>
        </Task.Anwser>
      ))
      }
    </>
  )
}

function useTop(quantity,cb,series){
  const data = useSort(cb ,series);
  return data.slice(0,quantity)
}
 
const ascendingOrder = (pre,val)=> Number(val.weatherElement[0].elementValue) - Number(pre.weatherElement[0].elementValue)
const getDistriction = (acc,val)=>{
  const cityName = val.parameter[0].parameterValue
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
  const top20 = useTop(20,ascendingOrder,data.location);
  const topList = top20.map(sensor=>(<div>{sensor.locationName}: {sensor.weatherElement[0].elementValue}</div>));
  const distriction = useReduce(getDistriction,top20,{});
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
  const getDistriction = getCountryInfo(data.locations[0]);
  const distriction = getDistriction("安樂區");
  const minTempInWeek = distriction.weatherElement[0].time
  const maxTempInWeek = distriction.weatherElement[1].time
  const minTemp = Math.min(...minTempInWeek.map(point=>point.elementValue[0].value)) 
  const maxTemp = Math.max(...maxTempInWeek.map(point=>point.elementValue[0].value)) 

  const subTempByDay = maxTempInWeek.map((point,index)=>point.elementValue[0].value - minTempInWeek[index].elementValue[0].value);
  const maxSub = Math.max(...subTempByDay)
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
      {`${maxSub}°C`}
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
