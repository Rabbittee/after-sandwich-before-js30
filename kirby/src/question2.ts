import { getWeather } from "./service";
import {
  tap,
  map,
  getTemperature,
  getAltitude,
  groupBy,
  compareBy,
  filter,
  isAccident,
  $,
  toJSON,
  sortBy,
  reduce,
} from "./utils";
import { WeatherStation, HasTemperature, HasAltitude } from "./types";

const ALTITUDE_UNIT = 500;

const formatAltitude = (level: number) =>
  `${level * ALTITUDE_UNIT}-${(level + 1) * ALTITUDE_UNIT}`;

const takeByMinTemp = reduce<Item>(
  compareBy((item1, item2) => item1.temp < item2.temp)
);

type Item = Pick<WeatherStation, "name"> & HasTemperature & HasAltitude;
getWeather()
  .then(
    map<any, Item>(({ locationName, weatherElement }) => ({
      temp: Number(getTemperature(weatherElement)),
      altitude: Number(getAltitude(weatherElement)),
      name: locationName,
    }))
  )
  // ignore all accident value
  .then(filter((item) => !isAccident(item.temp)))

  // group by altitude level
  .then(groupBy((item) => String(Math.floor(item.altitude / ALTITUDE_UNIT))))

  // to tuples [key, list]
  .then(Object.entries)

  // get min temp by comp items
  .then(
    map<[string, Item[]], [string, Item]>(
      //
      ([key, list]) => [key, takeByMinTemp(list)]
    )
  )

  // sort by level
  .then(sortBy(([key1], [key2]) => Number(key1) - Number(key2)))

  // format key
  .then(map(([key, value]) => [formatAltitude(Number(key)), value]))

  // back to object
  .then(Object.fromEntries)

  // to json string
  .then(toJSON)

  // render
  .then(tap((result) => ($("answer-2").innerHTML = result)));
