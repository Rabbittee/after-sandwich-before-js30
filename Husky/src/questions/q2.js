import { CWBApi } from "../api/cwb";
import { calcMethod } from "../utils";
import { Question } from ".";

const title =
  "第二題：同上，針對不同海拔高度找出最低溫測站，每500m一組，並回傳object";

const calcFn = async (query = { field: "TEMP", calc: "MIN", step: 500 }) => {
  const { field, calc, step } = query;
  const elevElement = "ELEV";
  const cwb = new CWBApi();
  const data = await cwb.getCurrent([field, elevElement], "weather");

  const getValue = (item) => item.weather[field];
  const fillZero = (int) => ("0000" + int).slice(-4);
  const getElevRange = (curr) => {
    const rangeBase = Math.floor(curr.weather[elevElement] / step) * step;
    return `${fillZero(rangeBase + 1)}-${fillZero(rangeBase + step)}`;
  };

  return data
    .filter((site) => getValue(site) !== -99)
    .reduce((acc, curr) => {
      const elevRange = getElevRange(curr);

      if (acc[elevRange]) {
        acc[elevRange] = calcMethod[calc](getValue)(acc[elevRange], curr);
      } else {
        acc[elevRange] = curr;
      }
      return acc;
    }, {});
};

export const question = new Question(title, calcFn);
