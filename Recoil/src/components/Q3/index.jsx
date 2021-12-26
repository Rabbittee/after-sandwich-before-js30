import Task from "../Task";
import { useWeatherAPI } from "../hooks";
import { top, pipe, groupBy } from "../../utils";
import { Card } from "../Card";

const filterTop20 = top(
  20,
  (pre, val) => val.weather.HOUR_24 - pre.weather.HOUR_24
);
const district = (acc, val) => {
  const cityName = val.district.CITY;
  if (acc.hasOwnProperty(cityName)) {
    acc[cityName].push(val);
    return acc;
  }
  return {
    [cityName]: [val],
    ...acc,
  };
};

function StationCard({ name, weather }) {
  return (
    <li key={name}>
      <div className="shadow-md rounded-md p-2 flex flex-col justify-center items-center bg-white bg-opacity-20">
        <h2 className="text-md font-bold px-2">{name}</h2>
        <div className="w-full flex justify-center items-end">
          <span className="text-base font-bold">{weather.HOUR_24}</span>
          <span className="ml-1">毫米</span>
        </div>
      </div>
    </li>
  );
}

function Country({ name, stations }) {
  return (
    <li>
      <Card title={name}>
        <ul className="flex flex-row flex-wrap gap-x-2 gap-y-4">
          {stations.map((station) => (
            <StationCard
              key={station.name}
              name={station.name}
              weather={station.weather}
            />
          ))}
        </ul>
      </Card>
    </li>
  );
}

function QuestionThree() {
  const data = useWeatherAPI("/v1/rest/datastore/O-A0002-001", {
    elementName: ["HOUR_24"],
  });

  if (!data) return <div>loading</div>;

  const top20 = pipe(filterTop20, groupBy(district))(data);
  const districts = Object.keys(top20).map((key) => (
    <Country name={key} stations={top20[key]} key={key} />
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
      <Task.Answer
        title="近24小時降雨量前20名:"
        className="bg-[url('/src/assets/images/q3_bg.jpeg')]"
      >
        <ul>{districts}</ul>
      </Task.Answer>
    </>
  );
}

export default QuestionThree;
