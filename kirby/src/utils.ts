import {
  WeatherElement,
  WeatherElementName,
  ParameterName,
  Parameter,
  TimeRange,
} from "./types";

export type QueryParams = Record<string, string | string[]>;

export const fromURL = (base: string) => (
  endpoint: string,
  queries: QueryParams = {}
) => {
  const url = new URL(endpoint, base);

  const format = (str: string | string[]) =>
    Array.isArray(str) ? str.join() : str;

  Object.entries(queries).forEach(([key, value]) =>
    url.searchParams.append(key, format(value))
  );

  return String(url);
};

export const parseJSON = (res: Response) => res.json();

export type UnaryFn<T, R> = (param: T) => R;
export type BinaryFn<T1, T2, R> = (param1: T1, param2: T2) => R;

export const tap = <T>(fn: UnaryFn<T, void>) => (param: T) => (
  fn(param), param
);
export const map = <T, R>(fn: UnaryFn<T, R>) => (list: T[]) => list.map(fn);

export const filter = <T>(pred: UnaryFn<T, boolean>) => (list: T[]) =>
  list.filter(pred);

export const find = <T>(pred: UnaryFn<T, boolean>) => (list: T[]) =>
  list.find(pred);

export const reduce = <T>(fn: BinaryFn<T, T, T>) => (list: T[]) =>
  list.reduce(fn);

export const groupBy = <T>(fn: UnaryFn<T, string>) => (list: T[]) =>
  list.reduce((acc, value) => {
    const key = fn(value);

    if (!(key in acc)) acc[key] = [];

    acc[key].push(value);

    return acc;
  }, {} as Record<string, T[]>);

export const sortBy = <T>(comp: BinaryFn<T, T, number>) => (list: T[]) =>
  list.slice().sort(comp);

export const take = <T>(count: number) => (list: T[]) => list.slice(0, count);

export const head = <T>(list: T[]) => list[0];

export const $ = (id: string) => document.getElementById(id);

export const toJSON = (obj: any) => JSON.stringify(obj, null, 2);

export const compareBy =
  //
  <T>(pred: BinaryFn<T, T, boolean>) => (item1: T, item2: T) =>
    pred(item1, item2) ? item1 : item2;

export const isAccident = (value: number) => value === -99;

type KeyFn<T> = (param: T) => string;
export function memo<T, R>(keyfn: KeyFn<T>, fn: (param: T) => R) {
  const cache: Record<string, R> = {};

  return (args?: T) => {
    const key = keyfn(args);

    if (!(key in cache)) cache[key] = fn(args);

    return cache[key];
  };
}

type ChunkName = WeatherElementName | ParameterName;
type Chunk = WeatherElement | Parameter;

export const normalize = (items: Chunk[]) =>
  items.map((item) => {
    if ("elementName" in item && "elementValue" in item)
      return { name: item.elementName, value: item.elementValue };

    if ("elementName" in item && "time" in item)
      return {
        name: item.elementName,
        value: item.time.map(({ startTime, endTime, elementValue }) => ({
          start: new Date(startTime),
          end: new Date(endTime),
          value: head(elementValue).value,
        })),
      };

    if ("parameterName" in item)
      return { name: item.parameterName, value: item.parameterValue };

    throw new Error(`unexpected item ${JSON.stringify(item)}`);
  });

export function monad<T>(value: T) {
  function then<R>(fn: UnaryFn<T, R>) {
    return monad(fn(value));
  }

  function unwrap() {
    return value;
  }

  return { then, unwrap };
}

const assert = <T>(check: UnaryFn<unknown, boolean>) => (item: unknown) => {
  if (!check(item)) throw new Error("assertion error");

  return item as T;
};

export const getBy =
  //
  <K extends ChunkName, T extends Chunk>(target: K) => (parameters: T[]) =>
    normalize(parameters).find(({ name }) => name === target)?.value;

export const getCity = (list: Parameter[]) =>
  monad(list)
    .then(getBy<ParameterName, Parameter>("CITY"))
    .then(assert<string>((item) => typeof item === "string"))
    .unwrap();

export const getTown = (list: Parameter[]) =>
  monad(list)
    .then(getBy<ParameterName, Parameter>("TOWN"))
    .then(assert<string>((item) => typeof item === "string"))
    .unwrap();

export const getTemperature = (list: WeatherElement[]) =>
  monad(list)
    .then(getBy<WeatherElementName, WeatherElement>("TEMP"))
    .then(assert<string>((item) => typeof item === "string"))
    .unwrap();

export const getMaxTemperature = (list: WeatherElement[]) =>
  monad(list)
    .then(getBy<WeatherElementName, WeatherElement>("MaxT"))
    // assert item is list
    .then(
      assert<(TimeRanges & { value: string })[]>((item) => Array.isArray(item))
    )
    // map to temperature
    .then(
      map(({ start, end, value }) => ({ start, end, value: Number(value) }))
    )
    // pick max temperature
    .then(reduce(compareBy((item1, item2) => item1.value > item2.value)))
    // take only temperature
    .then(({ value }) => value)
    .unwrap();

export const getMinTemperature = (list: WeatherElement[]) =>
  monad(list)
    .then(getBy<WeatherElementName, WeatherElement>("MinT"))
    // assert item is list
    .then(
      assert<(TimeRange & { value: string })[]>((item) => Array.isArray(item))
    )
    // map to temperature
    .then(
      map(({ start, end, value }) => ({ start, end, value: Number(value) }))
    )
    // pick max temperature
    .then(reduce(compareBy((item1, item2) => item1.value < item2.value)))
    // take only temperature
    .then(({ value }) => value)
    .unwrap();

export const getTemperatureDiffPerDay = (list: WeatherElement[]) =>
  monad(list)
    // take min and max temperature
    .then((list) => ({
      min: getBy<WeatherElementName, WeatherElement>("MinT")(list),
      max: getBy<WeatherElementName, WeatherElement>("MaxT")(list),
    }))
    // assert is list
    .then(({ min, max }) => ({
      min: assert<(TimeRange & { value: string })[]>(Array.isArray)(min),
      max: assert<(TimeRange & { value: string })[]>(Array.isArray)(max),
    }))
    // map to min and max per day
    .then(({ min, max }) => {
      type Item = { min: number; max: number };

      const records: Record<number, Partial<Item>> = {};

      function assign(date: number, key: string, value: string) {
        if (!(date in records)) records[date] = {};

        records[date][key] = Number(value);
      }

      min.forEach(({ start, end, value }) => {
        assign(start.getDate(), "min", value);
        assign(end.getDate(), "min", value);
      });

      max.forEach(({ start, end, value }) => {
        assign(start.getDate(), "max", value);
        assign(end.getDate(), "max", value);
      });

      return records;
    })
    // pick only values
    .then(Object.values)
    // calc by diff
    .then(map(({ min, max }) => max - min))
    // pick max
    .then((item) => Math.max(...item))
    .unwrap();

export const getAltitude = getBy<WeatherElementName, WeatherElement>("ELEV");
export const getPrecipitationPerDay =
  //
  getBy<WeatherElementName, WeatherElement>("HOUR_24");
