import { useEffect, useState, useCallback } from "react";
import { queryCwb } from "../api/api";
import { StationInfo, DistrictInfo } from "../utils";
/**
 *  @param {string} path
 *  @param {QueryWeatherConditions} body
 */
export function useWeatherAPI(path, body) {
  const [series, setSeries] = useState(null);
  useEffect(() => {
    queryCwb(path, body)
      .then((response) => {
        return response.records.location.map(
          (station) => new StationInfo(station)
        );
      })
      .then((data) =>
        data.filter((station) => Number(station.weather.TEMP) !== -99)
      )
      .then((data) => setSeries(data));
  }, []);
  return series;
}
export function useWeatherByDistrict(path, body) {
  const [series, setSeries] = useState(null);
  useEffect(() => {
    queryCwb(path, body)
      .then((response) => {
        return response.records.locations[0].location.map(
          (station) => new DistrictInfo(station)
        );
      })
      .then((data) =>
        data.filter((station) => Number(station.weather.TEMP) !== -99)
      )
      .then((data) => setSeries(data));
  }, []);
  return series;
}
