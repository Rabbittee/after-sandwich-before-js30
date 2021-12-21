import { CWBApi } from "../api/cwb";
import { Question } from ".";

// {
//   endTime: "2021-12-21 06:00:00",
//   startTime: "2021-12-21 00:00:00",
//   weather: {
//     MinT: 0,
//     MaxT: 10,
//   },
// };

const _zipData = (weather) => {
  return weather
    .map((curr) => {
      return curr.time.map((period) => {
        return {
          startTime: period.startTime,
          endTime: period.endTime,
          weather: period.elementValue.reduce((_prev, _curr) => {
            _prev[curr.elementName] = Number(_curr.value);
            return _prev;
          }, {}),
        };
      });
    })
    .reduce((prev, curr) => {
      prev.forEach((period, i) => {
        period.weather = { ...period.weather, ...curr[i].weather };
      });
      return prev;
    });
};

const title =
  "第四題：自己所在的縣市-鄉鎮，未來一週的最低溫與最高溫分別為多少？且單日溫差最大為多少？";

const calcFn = async (query = { fields: ["MinT", "MaxT"] }) => {
  const { fields } = query;
  const cwb = new CWBApi();
  let data = await cwb.getForecast(fields, ["臺北市"]);

  data = _zipData(data);

  console.log(data);

  return {
    minT: data.reduce((min, curr) =>
      curr.weather["MinT"] < min.weather["MinT"] ? curr : min
    ).weather["MinT"],
    maxT: data.reduce((max, curr) =>
      curr.weather["MaxT"] > max.weather["MaxT"] ? curr : max
    ).weather["MaxT"],
    // maxDiff: data.map((period) => {
    //   period.date = period
    // })
  };
};

export const question = new Question(title, calcFn);
