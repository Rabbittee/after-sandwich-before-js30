import { CWBApi } from "../api/cwb";
import { calcMethod } from "../utils";
import { Question } from ".";

const title =
  "第一題：找到全台當下最低溫的點，並列出 縣市 行政區 測站名稱 溫度 座標";

const calcFn = async (query = { field: "TEMP", calc: "MIN" }) => {
  const { field, calc } = query;
  const cwb = new CWBApi();
  const data = await cwb.getCurrent([field], "weather");

  const getValue = (item) => item.weather[field];
  return data
    .filter((site) => site.weather[field] !== -99)
    .reduce(calcMethod[calc](getValue));
};

export const question = new Question(title, calcFn);
