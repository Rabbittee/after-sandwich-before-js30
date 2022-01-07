import { useState, useEffect } from "react";
import { fetchData } from "@/api/api";
import { city, town, rain, noData } from "@/constant";

export function Answer3() {
  const apiPath = `O-A0002-001`;
  const [data, setData] = useState([]);
  const params = {
    parameterName: [city, town],
    elementName: [rain],
  };

  /**
   * 找出前20名降雨量最高的縣市
   * @returns {object}
   */
  useEffect(() => {
    const getData = async () => {
      const res = await fetchData(apiPath, params);
      const locationData = res.records.location;
      const filterData = locationData
        .sort((a, b) => {
          const valueA = a.weatherElement.find(
            (item) => item.elementName === rain
          ).elementValue;
          const valueB = b.weatherElement.find(
            (item) => item.elementName === rain
          ).elementValue;
          return valueB - valueA;
        })
        .slice(0, 20);
      console.log(filterData);
      const groupData = filterData.reduce((acc, cur) => {
        const cityName = cur.parameter.find(
          (item) => item.parameterName === city
        ).parameterValue;
        if (!acc[cityName]) acc[cityName] = [];
        acc[cityName].push(cur);
        return acc;
      }, {});
      console.log(Object.entries(groupData));
      setData([...Object.entries(groupData)]);
    };
    getData();
  }, []);
  console.log(data);
  return (
    <div className=" flex flex-col rounded-xl px-4 py-2 my-3 shadow bg-white text-green-600">
      {data.map(([key, value]) => {
        return (
          <ul key={key}>
            <h4 className="text-emerald-800 text-3xl">{key}</h4>
            {value.map((item, i) => {
              return (
                <li key={i} className="text-black">
                  {item.locationName}
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
}
