import { fromURL, parseJSON, QueryParams, toJSON, memo } from "./utils";
import { HOST, TOKEN } from "./constants";
import { LocationID } from "./types";

const fetchCWB = (endpoint: string, queries: QueryParams = {}) =>
  fetch(
    fromURL(HOST)(`api/v1/rest/datastore/${endpoint}`, {
      Authorization: TOKEN,
      ...queries,
    })
  );

export const getWeather = memo(
  //
  toJSON,
  (queries?: QueryParams) =>
    fetchCWB("O-A0001-001", queries)
      .then(parseJSON)
      .then(({ records }: any) => records.location)
);

export const getPrecipitation = memo(
  //
  toJSON,
  (queries?: QueryParams) =>
    fetchCWB("O-A0002-001", queries)
      .then(parseJSON)
      .then(({ records }: any) => records.location)
);

export const getForecast = memo(
  //
  toJSON,
  (locationId: LocationID | LocationID[]) =>
    fetchCWB("F-D0047-093", { locationId })
      .then(parseJSON)
      .then(({ records }) => records.locations)
);
