import { useState, useEffect } from "react";
import { fetchData } from "@/api/api";
import { city, town, temp } from "@/constant";

/**
 * 找出當下最低溫位置
 * @returns {object}
 */
export function Answer1() {
  const apiPath = `O-A0001-001`;
  const [data, setData] = useState({});
  const params = {
    parameterName: [city, town],
    elementName: temp,
  };

  useEffect(() => {
    const getData = async () => {
      const res = await fetchData(apiPath, params);
      const current = res.reduce((acc, cur) => {
        return acc.temp > cur.temp ? cur : acc;
      });
      const { locationName: name, lat, lon, temp, city, town } = current;
      setData({
        ...{
          lat,
          lon,
          name,
          temp,
          city,
          town,
        },
      });
    };
    getData();
  }, []);

  return (
    <div className=" flex flex-col rounded-xl px-4 py-2 my-3 shadow bg-white text-green-600">
      <p>{data.name}</p>
      <p>{data.temp}°C</p>
      <p>{data.city}</p>
      <p>{data.town}</p>
    </div>
  );
}
