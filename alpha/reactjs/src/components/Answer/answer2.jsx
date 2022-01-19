import { useState, useEffect } from "react";
import { fetchData } from "@/api/api";
import { city, town, temp, elev } from "@/constant";

/**
 * 找出海拔每500m最低溫位置
 * @returns {array}
 */
export function Answer2() {
  const apiPath = `O-A0001-001`;
  const [data, setData] = useState([]);
  const params = {
    parameterName: [city, town],
    elementName: [elev, temp],
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchData(apiPath, params);

      const currentObj = res.reduce((acc, cur) => {
        const { temp, elev, locationName: name, city, town } = cur;
        const step = (Math.floor(elev / 500) + 1) * 500;
        const { [step]: elevation } = acc;
        const next =
          elevation?.temp < temp ? elevation : { name, temp, city, town, elev };
        return {
          ...acc,
          [step]: next,
        };
      }, {});

      setData([...Object.entries(currentObj)]);
    };
    fetch();
  }, []);

  return (
    <div className=" flex flex-col rounded-xl px-4 py-2 my-3 shadow bg-white text-green-600 max-h-96 overflow-y-scroll ">
      {data.map(([step, item]) => {
        return (
          <ul key={step}>
            <li className="p-4">
              <h4 className="text-emerald-800 text-xl p-2">
                {"海拔範圍:"}
                {step - 500}
                {"-"}
                {step}
              </h4>
              <ul
                key={item.name}
                className="bg-green-600 text-white rounded-md p-2"
              >
                <li>
                  {"海拔:"}
                  {item.elev}
                </li>
                <li>
                  {item.city}
                  {"-"}
                  {item.name}
                </li>
                <li>
                  {"溫度:"}
                  {item.temp}
                </li>
              </ul>
            </li>
          </ul>
        );
      })}
    </div>
  );
}
