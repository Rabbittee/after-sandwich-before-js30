import Task from "../Task/Task";
import { useWeatherAPI } from "../hooks";
import { pipe, compare, lowestTempCond, jsonViewer } from "../../utils";
import { StationCard } from "../Card";

const groupByElevation = (data) =>
  data.reduce((acc, val) => {
    const elevation = Math.ceil(val.weather.ELEV / 500) * 500;
    const range = `${elevation - 500}-${elevation}`;
    if (acc.hasOwnProperty(range)) {
      acc[range].push(val);
      return acc;
    }
    return {
      ...acc,
      [range]: [val],
    };
  }, {});

const sortByElevation = (data) =>
  data.sort((a, b) => a.weather.ELEV - b.weather.ELEV);

const getLowestTemp = (data) =>
  Object.keys(data).reduce(
    (acc, val) => ({ ...acc, [val]: compare(lowestTempCond)(data[val]) }),
    {}
  );

function QuestionTwo() {
  const data = useWeatherAPI("/v1/rest/datastore/O-A0001-001", {
    elementName: ["ELEV", "TEMP"],
  });

  if (!data) return <div>loading</div>;

  const stationByRange = pipe(
    sortByElevation,
    groupByElevation,
    getLowestTemp
  )(data);

  const stationCards = Object.keys(stationByRange).map((elevation) => {
    const { name, district, weather, time } = stationByRange[elevation];
    return (
      <li key={elevation}>
        <StationCard
          type={elevation}
          name={name}
          elevation={weather.ELEV}
          district={`${district.CITY} ${district.TOWN}`}
          temp={weather.TEMP}
          time={time}
        />
      </li>
    );
  });

  return (
    <>
      <Task.Question title="題目二:">
        同上，針對不同海拔高度找出最低溫測站，每
        <span className="bg-blue-900 text-white">500m</span>
        一組，並回傳object
        <small className="block">(API: v1/rest/datastore/O-A0001-001)</small>
      </Task.Question>
      <Task.Answer
        title="每500公尺最低溫"
        className="bg-[url('/src/assets/images/bg_snow.jpg')]"
      >
        <ul>{stationCards}</ul>
      </Task.Answer>
      <Task.Answer title="每500公尺最低溫 JSON" className="bg-slate-900">
        <div className=" max-h-96 overflow-y-scroll">
          {jsonViewer(stationByRange)}
        </div>
      </Task.Answer>
    </>
  );
  
}

export default QuestionTwo;
