import Task from "../../components/Task";
import { useWeatherAPI } from "../hooks";
import { find, lowestTempCond } from "../../utils";
import { StationCard } from "../Card";

function QuestionOne() {
  const data = useWeatherAPI("/v1/rest/datastore/O-A0001-001", {
    elementName: ["TEMP", "ELEV"],
  });
  if (!data) return <div>loading</div>;
  const findStation = find(lowestTempCond);
  const { name, district, weather, time } = findStation(data);
  return (
    <>
      <Task.Question title="題目一:">
        找到全台當下最低溫的點，並列出
        <span className="bg-blue-900 text-white">縣市</span>
        <span className="bg-blue-900 text-white">行政區</span>
        <span className="bg-blue-900 text-white">測站名稱</span>
        <span className="bg-blue-900 text-white">溫度</span>
        <span className="bg-blue-900 text-white">座標</span>
        <small className="block">
          (透過中央氣象局ＡＰＩ取得全台測站即時資料)
        </small>
        <small className="block">(API: v1/rest/datastore/O-A0001-001)</small>
      </Task.Question>
      <Task.Answer
        title="當下最低溫的點"
        className="bg-[url('/src/assets/images/bg_snow.jpg')]"
      >
        <StationCard
          name={name}
          elevation={weather.ELEV}
          district={`${district.CITY} ${district.TOWN}`}
          temp={weather.TEMP}
          time={time.obsTime}
        />
      </Task.Answer>
    </>
  );
}

export default QuestionOne;
