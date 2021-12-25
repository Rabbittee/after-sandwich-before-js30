import { getForecast } from "./service";
import { HasName } from "./types";
import {
  head,
  tap,
  find,
  map,
  getMinTemperature,
  getMaxTemperature,
  getTemperatureDiffPerDay,
  toJSON,
  $,
} from "./utils";

const CITY = "F-D0047-071";
const TOWN = "土城區";

type Item = HasName & {
  temperature: {
    diff: number;
    max: number;
    min: number;
  };
};

getForecast(CITY)
  // take only first
  .then(head)

  // take only location
  .then(({ location }: any) => location)

  // map to item
  .then(
    map<any, Item>(({ locationName, weatherElement }) => ({
      name: locationName,

      temperature: {
        diff: getTemperatureDiffPerDay(weatherElement),
        max: getMaxTemperature(weatherElement),
        min: getMinTemperature(weatherElement),
      },
    }))
  )
  // pick item by location name
  .then(find((item) => item.name === TOWN))

  // pick only temperature
  .then(({ temperature }) => temperature)

  // to json string
  .then(toJSON)

  // render
  .then(tap((result) => ($("answer-4").innerHTML = result)));
