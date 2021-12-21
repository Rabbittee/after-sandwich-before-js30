import { CWBApi } from "../api/cwb";
import { calcMethod } from "../utils";
import { Question } from ".";
import { CWB as CWBConfig } from "../config";
const {
  datastore: {
    precipitation: { noData },
  },
} = CWBConfig;
const cwb = new CWBApi();

const title = "第三題：近24小時降雨量前20名是哪些？分別統計整理列在哪些縣市？";

const calcFn = async (query = { field: "HOUR_24", calc: "TOP", rank: 20 }) => {
  const { field, calc, rank } = query;
  const getValue = (site) => site.weather[field];

  const data = await cwb.getCurrent([field], "precipitation");

  const top = data
    .filter((site) => getValue(site) !== noData)
    .sort(calcMethod[calc](getValue))
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
