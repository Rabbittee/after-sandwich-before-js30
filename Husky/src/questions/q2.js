import { CWBApi } from "../api/cwb";
import { Question } from ".";

const title =
  "第二題：同上，針對不同海拔高度找出最低溫測站，每500m一組，並回傳object";

const calcFn = async (query = { field: "TEMP", calc: "MIN", step: 500 }) => {
  const { field, calc, step } = query;
  const elevElement = "ELEV";
  const cwb = new CWBApi();
  const data = await cwb.getCurrent([field, elevElement], "weather");

  const calcMethod = {
    MIN: (min, curr) => (curr.weather[field] < min.weather[field] ? curr : min),
    MAX: (min, curr) => (curr.weather[field] < min.weather[field] ? min : curr),
  };

  const fillZero = (int) => ("0000" + int).slice(-4);

  return data
    .map((site) => {
      const rangeBase = Math.floor(site.weather[elevElement] / step) * step;
      site.elevRange = `${fillZero(rangeBase + 1)}-${fillZero(
        rangeBase + step
      )}`;
      return site;
    })
    .filter((site) => site.weather[field] !== -99)
    .reduce((acc, curr) => {
      if (acc[curr.elevRange]) {
        acc[curr.elevRange] = calcMethod[calc](acc[curr.elevRange], curr);
      } else {
        acc[curr.elevRange] = curr;
      }
      return acc;
    }, {});
};

export const question = new Question(title, calcFn);
