import { CWBApi } from "../api/cwb";
import { calcMethod } from "../utils";
import { Question } from ".";
import { CWB as CWBConfig } from "../config";

const {
  datastore: {
    weather: { noData },
  },
} = CWBConfig;
const evel = "ELEV";

const cwb = new CWBApi();
const fillZero = (int) => ("0000" + int).slice(-4);
const format = (rankMap) => {
  return Object.entries(rankMap)
    .map(([elevRange, site]) => {
      return {
        elevRange,
        site,
      };
    })
    .sort(calcMethod.BOTTOM((rank) => rank.elevRange));
};

const title =
  "第二題：同上，針對不同海拔高度找出最低溫測站，每500m一組，並回傳object";

const calcFn = async (query = { field: "TEMP", calc: "MIN", step: 500 }) => {
  const { field, calc, step } = query;
  const getValue = (site) => site.weather[field];
  const getElevRange = (site) => {
    const rangeBase = Math.floor(site.weather[evel] / step) * step;
    return `${fillZero(rangeBase)}-${fillZero(rangeBase + step - 1)}`;
  };

  const data = await cwb.getCurrent([field, evel], "weather");

  const rankMap = data
    .filter((site) => getValue(site) !== noData)
    .reduce((acc, curr) => {
      const elevRange = getElevRange(curr);

      if (acc[elevRange]) {
        acc[elevRange] = calcMethod[calc](getValue)(acc[elevRange], curr);
      } else {
        acc[elevRange] = curr;
      }
      return acc;
    }, {});

  return format(rankMap);
};

export const question = new Question(title, calcFn);
