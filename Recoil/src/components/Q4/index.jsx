import Task from "../Task";
import { useWeatherByDistrict } from "../hooks";
import { find, pipe } from "../../utils";

const normalizeTime = (data) =>
  data.reduce((acc, val) => {
    const key = val.dataTime.slice(0, 10);
    const temp = Number(val.elementValue[0].value);
    if (!acc.hasOwnProperty(key)) {
      return {
        ...acc,
        [key]: [temp],
      };
    }
    acc[key].push(temp);
    return acc;
  }, {});
const diffTempByDay = (data) =>
  data.map(([date, temps]) => ({
    date,
    diffTemp: Math.max(...temps) - Math.min(...temps),
  }));
const getMaxDiffTemp = (data) =>
  find((acc, val) => (acc.diffTemp < val.diffTemp ? val : acc))(data);

function QuestionFour() {
  const data = useWeatherByDistrict("/v1/rest/datastore/F-D0047-089", {
    locationName: ["基隆市"],
    elementName: ["T"],
  });
  if (!data) return <div>loading</div>;
  const tempSeries = data[0].weather.T.time;
  const maxestTemp = find((pre, val) =>
    pre.elementValue[0].value > val.elementValue[0].value ? pre : val
  )(tempSeries);
  const lowestTemp = find((pre, val) =>
    pre.elementValue[0].value < val.elementValue[0].value ? pre : val
  )(tempSeries);

  const maxDiffTemp = pipe(
    normalizeTime,
    Object.entries,
    diffTempByDay,
    getMaxDiffTemp
  )(tempSeries);
  return (
    <>
      <Task.Question title="題目四:格式自己定辣，我懶">
        自己所在的縣市，未來兩天的
        <span className="bg-blue-900 text-white">最低溫</span>與
        <span className="bg-blue-900 text-white">最高溫</span>分別為多少？
        <br />且<span className="bg-blue-900 text-white">最大單日溫差</span>
        為多少？
        <small className="block">
          (API: ​/v1​/rest​/datastore​/F-D0047-089)
        </small>
      </Task.Question>
      <Task.Answer title="未來一週的最低溫與最高溫:">
        <div>{`最低溫:${JSON.stringify(lowestTemp)}°C`}</div>
        <div>{`最高溫:${JSON.stringify(maxestTemp)}°C`}</div>
        <div>{`單日溫差最大為:${JSON.stringify(maxDiffTemp)}`}</div>
      </Task.Answer>
    </>
  );
}

export default QuestionFour;
