import CWBApi from "../api/cwb";
import { CWBToken } from "../config";

const cwb = new CWBApi(CWBToken);

const question = async (field = "TEMP", calc = "MIN") => {
  const data = await cwb.getCurrentWeather([field]);

  const calcMethod = {
    MIN: (min, curr) => (curr.weather[field] < min.weather[field] ? curr : min),
    MAX: (min, curr) => (curr.weather[field] < min.weather[field] ? min : curr),
  };

  return data
    .filter((site) => site.weather[field] !== -99)
    .reduce(calcMethod[calc]);
};

export { question };
