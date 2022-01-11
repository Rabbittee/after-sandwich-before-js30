import { formatData, formatTempData } from "../methods/format";

export async function fetchData(apiPath, params, isLocations = false) {
  const paramsObj = {
    Authorization: `${import.meta.env.VITE_API_TOKEN}`,
    ...params,
  };
  const searchParams = new URLSearchParams(paramsObj);
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/${apiPath}?${searchParams}`
    );
    if (isLocations) {
      const { records } = await res.json();
      const temp = records.locations[0].location;
      return temp.reduce(formatTempData, []);
    } else {
      const {
        records: { location },
      } = await res.json();
      const data = location.reduce(formatData, []);
      return data;
    }
  } catch (error) {
    throw new Error(error);
  }
}
