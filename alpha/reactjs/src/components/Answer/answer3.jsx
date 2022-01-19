import { useState, useEffect } from "react";
import { fetchData } from "@/api/api";
import { city, town, rain } from "@/constant";

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

      const filterData = res
        .sort((a, b) => {
          return b.rain - a.rain;
        })
        .slice(0, 20);

      const groupData = filterData.reduce((acc, cur) => {
        const { city } = cur;
        if (!acc[city]) acc[city] = [];
        acc[city].push(cur);
        return acc;
      }, {});

      setData([...Object.entries(groupData)]);
    };
    getData();
  }, []);

  return (
    <div className=" flex flex-col rounded-xl px-4 py-2 my-3 shadow bg-white text-green-600 max-h-96 overflow-y-scroll ">
      {data.map(([key, value]) => {
        return (
          <ul key={key} className="p-4">
            <h4 className="text-emerald-800 text-2xl py-2">{key}</h4>
            {value.map((item, i) => {
              return (
                <li
                  key={i}
                  className="p-4 bg-green-600 text-white rounded-md my-2"
                >
                  <p>
                    {"觀測站:"}
                    {item.locationName} {item.stationId}
                  </p>
                  <p>
                    {"降雨量:"}
                    {item.rain}
                  </p>
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
}
