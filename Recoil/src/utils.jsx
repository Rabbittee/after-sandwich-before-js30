export const pipe =
  (...funcs) =>
  (x) =>
    funcs.reduce((acc, func) => func(acc), x);

export const compare = (cond) => (data) => data.reduce(cond);

export const top = (quantity, cb) => (series) =>
  series.sort(cb).slice(0, quantity);

export const jsonViewer = (o) => {
  const showText = JSON.stringify(o, null, "    ");
  return showText.split("\n").map((row) => <pre key={row}>{row}</pre>);
};

export const lowestTempCond = (acc, val) => {
  if (val.weather.TEMP < acc.weather.TEMP) return val;
  return acc;
};

export function StationInfo({
  locationName,
  lat,
  lon,
  weatherElement,
  time,
  parameter,
}) {
  this.name = locationName;
  this.geoLocation = { lat: Number(lat), lon: Number(lon) };
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

export function DistrictInfo({ locationName, lat, lon, weatherElement }) {
  this.name = locationName;
  this.geoLocation = { lat: Number(lat), lon: Number(lon) };
  this.weather = weatherElement.reduce(
    (acc, val) => ({
      ...acc,
      [val.elementName]: {
        description: val.description,
        time: val.time.map(({ dataTime, elementValue }) => ({
          dataTime,
          value: Number(elementValue[0].value),
          measures: elementValue[0].measures,
        })),
      },
    }),
    {}
  );
}
