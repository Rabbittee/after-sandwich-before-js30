import Task from "../Task";
import { useWeatherAPI } from "../hooks";
import { top } from "../../utils";

const handleDistrict = (acc, val) => {
  const cityName = val.district.CITY;
  if (!acc.hasOwnProperty(cityName)) {
    return {
      [cityName]: [val],
      ...acc,
    };
  }
  acc[cityName].push(val);
  return acc;
};

function StationCard({ name, weather }) {
  return (
    <li>
      <div className="shadow-md rounded-md py-2 flex flex-col justify-start bg-white bg-opacity-30">
        <h2 className="w-full text-md font-bold px-2">{name}</h2>
        <span className="w-full flex justify-center">{weather.HOUR_24}</span>
      </div>
    </li>
  );
}

function Country({ name, stations }) {
  return (
    <li>
      <h4 className="text-lg font-bold">{name}</h4>
      <ul className="flex flex-row gap-x-2">{stations.map(StationCard)}</ul>
    </li>
  );
}

function QuestionThree() {
  const data = useWeatherAPI("/v1/rest/datastore/O-A0002-001", {
    elementName: ["HOUR_24"],
  });
  if (!data) return <div>loading</div>;
  const getTop20 = top(
    20,
    (pre, val) => val.weather.HOUR_24 - pre.weather.HOUR_24
  );
  const top20 = getTop20(data);
  const district = top20.reduce(handleDistrict, {});
  const distribute = Object.keys(district).map((key) => (
    <Country name={key} stations={district[key]} />
  ));
  return (
    <>
      <Task.Question title="題目三:格式自己定辣，我懶">
        近<span className="bg-blue-900 text-white">24小時</span>降雨量
        <span className="bg-blue-900 text-white">前20名</span>是哪些？
        <br />
        分別統計整理列在哪些<span className="bg-blue-900 text-white">縣市</span>
        ？<small className="block">HOUR_24欄位為近24小時的累積降雨量</small>
        <small className="block">(API: /v1/rest/datastore/O-A0002-001)</small>
      </Task.Question>
      <Task.Answer title="近24小時降雨量前20名:">
        <div className="w-full h-full bg-[url('/src/assets/images/q3_bg.jpeg')] rounded-md overflow-hidden">
          <ul className="flex flex-col gap-y-2  bg-cover px-4 py-2 filter backdrop-blur-md">
            {distribute}
          </ul>
        </div>
      </Task.Answer>
    </>
  );
}

export default QuestionThree;
