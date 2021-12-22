import { CWBApi } from "../api/cwb";
import { CALC_METHOD } from "../utils";
import { Question } from ".";
import { CWB as CWBConfig } from "../config";

const {
  datastore: {
    weather: { noData },
  },
} = CWBConfig;
const elevation = "ELEV";

const cwb = new CWBApi();
const fillZero = (int) => ("0000" + int).slice(-4);
const format = (rankMap) => {
  return Object.entries(rankMap)
    .map(([elevationRange, site]) => {
      return {
        elevationRange,
        site,
      };
    })
    .sort(CALC_METHOD.bottom((rank) => rank.elevRange));
};

const title =
  "第二題：同上，針對不同海拔高度找出最低溫測站，每500m一組，並回傳object";

const calcFn = async (query = { field: "TEMP", calc: "min", step: 500 }) => {
  const { field, calc, step } = query;
  const getValue = (site) => site.weather[field];
  const getElevationRange = (site) => {
    const rangeBase = Math.floor(site.weather[elevation] / step) * step;
    return `${fillZero(rangeBase)}-${fillZero(rangeBase + step - 1)}`;
  };

  const data = await cwb.getCurrent([field, elevation], "weather");

  const rankMap = data
    .filter((site) => getValue(site) !== noData)
    .reduce((acc, curr) => {
      const elevationRange = getElevationRange(curr);

      if (acc[elevationRange]) {
        acc[elevationRange] = CALC_METHOD[calc](getValue)(
          acc[elevationRange],
          curr
        );
      } else {
        acc[elevationRange] = curr;
      }
      return acc;
    }, {});

  return format(rankMap);
};

export const question = new Question(title, calcFn);
