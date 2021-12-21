import { CWBApi } from "../api/cwb";
import { Question } from ".";

// {
//   dataTime: "2021-12-21 06:00:00",
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

const mergeDate = (data, field) => {
  return Object.entries(
    data.reduce((acc, curr) => {
      const date = curr.dataTime.slice(0, 10);
      if (acc[date] == null) {
        acc[date] = [];
      }
      acc[date].push(curr.weather[field]);
      return acc;
    }, {})
  ).sort((a, b) => (a[0] > b[0] ? 1 : -1));
};

const findMaxDiff = (arr) => {
  arr = arr.sort();
  return arr.slice(-1)[0] - arr.slice(0)[0];
};

const title =
  "第四題：自己所在的縣市-鄉鎮，未來一週的最低溫與最高溫分別為多少？且單日溫差最大為多少？";

const calcFn = async (query = { field: "T", locationName: "臺北市" }) => {
  const { field, locationName } = query;
  const cwb = new CWBApi();
  let data = await cwb.getForecast([field], [locationName]);
  data = _zipData(data);

  return {
    min: data.reduce((min, curr) =>
      curr.weather[field] < min.weather[field] ? curr : min
    ),
    max: data.reduce((max, curr) =>
      curr.weather[field] > max.weather[field] ? curr : max
    ),
    maxDiff: mergeDate(data, field)
      .map(([date, arr]) => {
        return {
          date: date,
          diff: findMaxDiff(arr),
        };
      })
      .reduce((max, curr) => (curr.diff > max.diff ? curr : max)),
  };
};

export const question = new Question(title, calcFn);
