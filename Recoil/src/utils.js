export const pipe =
  (...funcs) =>
  (x) =>
    funcs.reduce((acc, func) => func(acc), x);

export const find = (cond) => (data) => data.reduce(cond);

export const toFormat = (to, series) => series.map(to);

export const top = (quantity, cb) => (series) =>
  series.sort(cb).slice(0, quantity);

export const lowestTempCond = (acc, val, index) => {
  if (index === 0) return acc;
  if (val.weather.TEMP < acc.weather.TEMP) return val;
  return acc;
};

export const groupBy = (handler) => (data) => data.reduce(handler, {});

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
    this.time = time.obsTime;
  }
}
export class DistrictInfo {
  constructor({ locationName, lat, lon, weatherElement }) {
    this.name = locationName;
    this.geoLocation = { lat, lon };
    this.weather = weatherElement.reduce(
      (acc, val) => ({
        ...acc,
        [val.elementName]: {
          description: val.description,
          time: val.time.map(({ dataTime, elementValue }) => ({
            dataTime,
            value: Number(elementValue[0].value),
            measures: elementValue[0].measures
          })),
        },
      }),
      {}
    );
  }
}
