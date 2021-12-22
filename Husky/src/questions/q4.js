import { CWBApi } from "../api/cwb";
import { CALC_METHOD } from "../utils";
import { Question } from ".";

// {
//   dataTime: "2021-12-21 06:00:00",
//   weather: {
//     MinT: 0,
//     MaxT: 10,
//   },
// };

const zipData = (weather) => {
  return weather
    .map((curr) => {
      return curr.time.map((period) => {
        return {
          dataTime: period.dataTime,
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

const mergeSameDate = (data, getValue) => {
  return Object.entries(
    data.reduce((acc, curr) => {
      const date = curr.dataTime.slice(0, 10);
      if (acc[date] === undefined) {
        acc[date] = [];
      }
      acc[date].push(getValue(curr));
      return acc;
    }, {})
  ).sort(CALC_METHOD.bottom((item) => item[0]));
};

const findMaxDiff = (arr) => {
  arr = arr.sort();
  const max = arr.slice(-1)[0];
  const min = arr.slice(0)[0];
  return {
    range: `${min}~${max}`,
    diff: max - min,
  };
};

const title =
  "第四題：自己所在的縣市，未來兩天的最低溫與最高溫分別為多少？且最大單日溫差為多少？";

const calcFn = async (query = { field: "T", locationName: "臺北市" }) => {
  const { field, locationName } = query;
  const cwb = new CWBApi();
  let data = await cwb.getForecast([field], locationName);
  data = zipData(data);

  const getValue = (site) => site.weather[field];

  return {
    min: data.reduce(CALC_METHOD.min(getValue)),
    max: data.reduce(CALC_METHOD.max(getValue)),
    maxDiff: mergeSameDate(data, getValue)
      .map(([date, arr]) => {
        return {
          ...{ date: date },
          ...findMaxDiff(arr),
        };
      })
      .reduce(CALC_METHOD.max((date) => date.diff)),
  };
};

export const question = new Question(title, calcFn);
