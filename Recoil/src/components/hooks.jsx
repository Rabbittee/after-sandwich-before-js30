import { useEffect, useState } from "react";
import { queryCwb } from "../api/api";
import { StationInfo, DistrictInfo } from "../utils";

const ERROR_CODE = {
  noData: -99,
};
const structure = (ClassType) => (data) => data.map((o) => new ClassType(o));
const isValid = (data) =>
  data.filter((o) => o.weather.TEMP !== ERROR_CODE.noData);

/**
 *  @param {string} path
 *  @param {QueryWeatherConditions} body
 */
export function useWeatherAPI(path, body) {
  const [series, setSeries] = useState(null);
  useEffect(() => {
    queryCwb(path, body)
      .then((response) => response.records.location)
      .then(structure(StationInfo))
      .then(isValid)
      .then(setSeries);
  }, []);
  return series;
}
/**
 *  @param {string} path
 *  @param {QueryWeatherConditions} body
 */
export function useWeatherByDistrict(path, body) {
  const [series, setSeries] = useState(null);
  useEffect(() => {
    queryCwb(path, body)
      .then((response) => response.records.locations[0].location)
      .then(structure(DistrictInfo))
      .then(isValid)
      .then(setSeries);
  }, []);
  return series;
}
