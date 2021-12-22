import { getWeather } from "./service";
import {
  tap,
  filter,
  map,
  $,
  toJSON,
  getCity,
  getTown,
  getTemperature,
  isAccident,
  reduce,
  compareBy,
} from "./utils";
import { WeatherStation, HasTemperature, HasLocation } from "./types";

type Item = WeatherStation & HasTemperature & HasLocation;
getWeather()
  .then(
    map<any, Item>(({ lat, lon, locationName, parameter, weatherElement }) => ({
      city: getCity(parameter),
      town: getTown(parameter),
      temp: Number(getTemperature(weatherElement)),
      name: locationName,
      location: {
        lat: Number(lat),
        lon: Number(lon),
      },
    }))
  )
  // ignore all accident value
  .then(filter((item) => !isAccident(item.temp)))

  // get min temp by comp items
  .then(reduce(compareBy((item1, item2) => item1.temp < item2.temp)))

  // to JSON string
  .then(toJSON)

  // render
  .then(tap((result) => ($("answer-1").innerHTML = result)));
