import { CWBApi } from "../api/cwb";
import { Question } from ".";

const title = "第三題：近24小時降雨量前20名是哪些？分別統計整理列在哪些縣市？";

const calcFn = async (query = { field: "HOUR_24", calc: "MAX", rank: 20 }) => {
  const { field, calc, rank } = query;
  const cwb = new CWBApi();
  const data = await cwb.getCurrent([field], "precipitation");

  const calcMethod = {
    MIN: (a, b) => (a.weather[field] < b.weather[field] ? -1 : 1),
    MAX: (a, b) => (a.weather[field] > b.weather[field] ? -1 : 1),
  };

  const top = data
    .filter((site) => site.weather[field] !== -999)
    .sort(calcMethod[calc])
    .slice(0, rank);

  const stat = top.reduce((acc, curr) => {
    if (acc[curr.parameter.CITY] == null) {
      acc[curr.parameter.CITY] = 0;
    }
    acc[curr.parameter.CITY] += 1;
    return acc;
  }, {});

  return { top, stat };
};

export const question = new Question(title, calcFn);
