import { getPrecipitation } from "./service";
import {
  tap,
  map,
  getTown,
  getCity,
  getPrecipitationPerDay,
  sortBy,
  take,
  groupBy,
  $,
  toJSON,
} from "./utils";
import { WeatherStation, HasPrecipitation } from "./types";

type Item = WeatherStation & HasPrecipitation;

getPrecipitation()
  .then(
    map<any, Item>(({ locationName, parameter, weatherElement }) => ({
      name: locationName,
      town: getTown(parameter),
      city: getCity(parameter),
      precipitation: Number(getPrecipitationPerDay(weatherElement)),
    }))
  )
  // sort by precipitaion
  .then(sortBy((item1, item2) => item2.precipitation - item1.precipitation))

  // take top 20
  .then(take(20))

  // group by city
  .then(groupBy((item) => item.city))

  // to json string
  .then(toJSON)

  // render
  .then(tap((result) => ($("answer-3").innerHTML = result)));
