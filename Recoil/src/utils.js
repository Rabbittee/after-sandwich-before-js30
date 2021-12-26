export const pipe =
  (...funcs) =>
  (x) =>
    funcs.reduce((acc, func) => func(acc), x);

export const find = (cond) => (data) => data.reduce(cond);

export const toFormat = (to, series) => series.map(to);

export const top = (quantity, cb) => (series) =>
  series.sort(cb).slice(0, quantity);

export const lowestTempCond = (acc, val) => {
  if (acc !== null) {
    const newTemp = val.weather.TEMP;
    const preTemp = acc.weather.TEMP;
    if (Number(newTemp) < Number(preTemp)) return val;
    return acc;
  }
  return val;
};

export class StationInfo {
  constructor({ locationName, lat, lon, weatherElement, time, parameter }) {
    this.name = locationName;
    this.geoLocation = { lat, lon };
    this.district = parameter.reduce(
      (acc, val) => ({
        ...acc,
        [val.parameterName]: ["TOWN_SN", "CITY_SN"].includes(val.parameterName)
          ? Number(val.parameterValue)
          : val.parameterValue,
      }),
      {}
    );
    this.weather = weatherElement.reduce(
      (acc, val) => ({ ...acc, [val.elementName]: Number(val.elementValue) }),
      {}
    );
    this.time = time;
  }
}
export class DistrictInfo {
  constructor({ locationName, lat, lon, weatherElement, time }) {
    this.name = locationName;
    this.geoLocation = { lat, lon };
    this.weather = weatherElement.reduce(
      (acc, val) => ({
        ...acc,
        [val.elementName]: { description: val.description, time: val.time },
      }),
      {}
    );
    this.time = time;
  }
}
