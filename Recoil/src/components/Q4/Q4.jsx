import Task from "../Task/Task";
import { useWeatherByDistrict } from "../hooks";
import { compare, pipe, jsonViewer } from "../../utils";
import { TempCard } from "../Card";

const groupByEveryDay = (data) =>
  data.reduce((acc, val) => {
    const date = val.dataTime.substring(0, 10);
    console.log(date);
    if (acc.hasOwnProperty(date)) {
      acc[date].push(val.value);
      return acc;
    }

    return {
      ...acc,
      [date]: [val.value],
    };
  }, {});

const computeTempDiff = (data) =>
  data.map(([date, temps]) => ({
    date,
    diffTemp: Math.max(...temps) - Math.min(...temps),
  }));

const findMaxTempDiff = compare((acc, val) =>
  acc.diffTemp > val.diffTemp ? acc : val
);

function QuestionFour() {
  const data = useWeatherByDistrict("/v1/rest/datastore/F-D0047-089", {
    locationName: ["基隆市"],
    elementName: ["T"],
  });

  if (!data) return <div>loading</div>;

  const tempSeries = data[0].weather.T.time;

  const heighestTemp = compare((pre, val) => (pre.value > val.value ? pre : val))(
    tempSeries
  );

  const lowestTemp = compare((pre, val) => (pre.value < val.value ? pre : val))(
    tempSeries
  );

  const maxDiffTemp = pipe(
    groupByEveryDay,
    Object.entries,
    computeTempDiff,
    findMaxTempDiff
  )(tempSeries);

  return (
    <>
      <Task.Question title="題目四:格式自己定辣，我懶">
        自己所在的縣市，未來兩天的
        <span className="bg-blue-900 text-white">最低溫</span>與
        <span className="bg-blue-900 text-white">最高溫</span>分別為多少？
        <br />且<span className="bg-blue-900 text-white">最大單日溫差</span>
        為多少？
        <small className="block">(API: /v1/rest/datastore/F-D0047-089)</small>
      </Task.Question>
      <Task.Answer
        title="未來一週的最低溫與最高溫:"
        className="bg-[url('/src/assets/images/bg_snow.jpg')]"
      >
        <TempCard
          title={"最低溫"}
          temp={lowestTemp.value}
          time={lowestTemp.dataTime}
        />
        <TempCard
          title={"最高溫"}
          temp={heighestTemp.value}
          time={heighestTemp.dataTime}
        />
        <TempCard
          title={"單日溫差最大"}
          temp={maxDiffTemp.diffTemp}
          time={maxDiffTemp.date}
        />
      </Task.Answer>
      <Task.Answer title="最低溫 JSON" className="bg-slate-900">
        {jsonViewer(lowestTemp)}
      </Task.Answer>
      <Task.Answer title="最高溫 JSON" className="bg-slate-900">
        {jsonViewer(heighestTemp)}
      </Task.Answer>
      <Task.Answer title="單日溫差最大 JSON" className="bg-slate-900">
        {jsonViewer(maxDiffTemp)}
      </Task.Answer>
    </>
  );
}

export default QuestionFour;
