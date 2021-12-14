import { CWB } from './config.js';
import { normalizeLocation } from './normalize.js';

const { host, token, prefix } = CWB;
const searchParams = new URLSearchParams({ Authorization: token });
const fetchData = (path) => fetch(`${host}${prefix}${path}?${searchParams}`);

const store = {
  temperature: null,
  rainfall: null,
  forecast: null,
};

/**
 * 自動氣象站資料-無人自動站氣象資料
 *
 * for q1 and q2
 * @returns
 */
export const fetchTemperature = async () => {
  if (store.temperature) {
    return store.temperature;
  }

  const apiPath = '/O-A0001-001';
  const res = await fetchData(apiPath);
  const {
    records: { location },
  } = await res.json();

  store.temperature = location.reduce(normalizeLocation, []);
  return store.temperature;
};

/**
 * 自動雨量站資料-無人自動站雨量資料
 *
 * for q3
 * @returns
 */
export const fetchRainfall = async () => {
  if (store.rainfall) {
    return store.rainfall;
  }

  const apiPath = '/O-A0002-001';
  const res = await fetchData(apiPath);
  const {
    records: { location },
  } = await res.json();

  store.rainfall = location.reduce(normalizeLocation, []);
  return store.rainfall;
};

/**
 * 台北市未來1週天氣預報
 *
 * for q4
 * @returns
 */
export const fetchForecast = async () => {
  if (store.forecast) {
    return store.forecast;
  }

  const apiPath = '/F-D0047-063';
  const res = await fetchData(apiPath);
  const {
    records: {
      locations: [{ location }],
    },
  } = await res.json();

  store.forecast = location;
  return store.forecast;
};
