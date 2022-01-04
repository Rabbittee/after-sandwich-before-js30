import { useState, useEffect } from "react";
import { fetchData } from "@/api/api";
import { city, town, temp, noData } from "@/constant";

export function Answer1() {
  const apiPath = `O-A0001-001`;
  const [data, setData] = useState({});
  const params = {
    parameterName: [city, town],
    elementName: temp,
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await fetchData(apiPath, params);
      const locationData = res.records.location;
      const getTemp = (array) =>
        array.weatherElement.find((item) => item.elementName === temp)
          .elementValue;
      const currentObj = locationData
        .filter((array) => {
          return getTemp(array) !== noData;
        })
        .reduce((acc, cur) => {
          return Number(getTemp(cur)) < Number(getTemp(acc)) ? cur : acc;
        });
      console.log(currentObj);
      const { locationName, lat, lon, parameter, weatherElement } = currentObj;
      const currentTemp = weatherElement.find(
        (item) => item.elementName === temp
      ).elementValue;
      const currentCity = parameter.find(
        (item) => item.parameterName === city
      ).parameterValue;
      const currentTown = parameter.find(
        (item) => item.parameterName === town
      ).parameterValue;
      setData({
        ...{
          lat,
          lon,
          locationName,
          currentTemp,
          currentCity,
          currentTown,
        },
      });
    };
    fetch();
  }, []);
  console.log(data);

  return (
    <div className=" flex flex-col rounded-xl px-4 py-2 my-3 shadow bg-white text-green-600">
      {/* <h6 className="text-md my-2">Answer:</h6> */}

      <p>{data.locationName}</p>
      <p>{data.currentTemp}度</p>
      <p>{data.currentCity}</p>
      <p>{data.currentTown}</p>
    </div>
  );
}
