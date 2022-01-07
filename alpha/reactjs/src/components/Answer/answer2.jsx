import { useState, useEffect } from "react";
import { fetchData } from "@/api/api";
import { city, town, temp, elev, noData } from "@/constant";

/**
 * 找出海拔每500m最低溫位置
 * @returns {object}
 */
export function Answer2() {
  const apiPath = `O-A0001-001`;
  const [data, setData] = useState({});
  const params = {
    parameterName: [city, town],
    elementName: [elev, temp],
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchData(apiPath, params);
      const locationData = res.records.location;

      const getTemp = (array) => {
        array.find((item) => item.elementName === temp).elementValue;
      };
      const getElev = (array) => {
        array.find((item) => item.elementName === elev).elementValue;
      };
      const getCity = (array) => {
        array.find((item) => item.parameterName === city).parameterValue;
      };
      const getTown = (array) => {
        array.find((item) => item.parameterName === town).parameterValue;
      };

      const currentObj = locationData.reduce((acc, cur) => {
        const { locationName: name, parameter, weatherElement } = cur;
        // console.log(weatherElement);
        const tempValue = getTemp(weatherElement);
        const elevation = getElev(weatherElement);
        const cityName = getCity(parameter);
        const townName = getTown(parameter);
        //find pre 500m elevation;
        const step = (Math.floor(elevation / 500) + 1) * 500;
        //get pre 500m array;
        const { [step]: tempObj } = acc;

        //find next if temp is current value;
        const next =
          tempObj?.tempValue < tempValue
            ? tempObj
            : {
                城市: cityName,
                townName,
                name,
                elevation,
              };
        return {
          ...acc,
          [step]: next,
        };
      }, {});
      console.log(currentObj);
      setData({ ...currentObj });
    };
    fetch();
  }, []);

  return (
    <div className=" flex flex-col rounded-xl px-4 py-2 my-3 shadow bg-white text-green-600">
      {/* <p>{data}</p> */}
    </div>
  );
}
