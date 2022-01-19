import { useState, useEffect } from "react";
import { fetchData } from "@/api/api";
import { city, town, tempPrediction, myCity } from "@/constant";
import dayjs from "dayjs";

/**
 * 找出當下最低溫位置
 * @returns {object}
 */
export function Answer4() {
  const apiPath = `F-D0047-089`;
  const [data, setData] = useState({});
  const getDate = (time) => dayjs(time).format("MMDD");
  const params = {
    parameterName: [city, town],
    elementName: tempPrediction,
    locationName: myCity,
    sort: "time",
  };
  const groupBy = (array) =>
    Object.entries(
      array.reduce((acc, cur) => {
        const day = getDate(cur.dataTime);
        acc[day] === undefined
          ? (acc[day] = [])
          : acc[day].push(Number(cur.elementValue[0].value));
        return acc;
      }, {})
    );
  const getMaxDiff = (array) => {
    const max = Math.max(...array);
    const min = Math.min(...array);
    return { diff: max - min };
  };

  /**
   * 找出所在縣市的未來最高溫跟最低溫以及最大單日溫差
   * @returns {object}
   */
  const getData = async () => {
    const [res] = await fetchData(apiPath, params, true);
    const { tempInTime } = res;

    //get each date diff maximum put in array
    const diffArray = groupBy(tempInTime)
      .map(([date, array]) => {
        return {
          ...date,
          ...getMaxDiff(array),
        };
      })
      .map((item) => item.diff);

    //get max temperature
    const maxTemp = Math.max(
      ...tempInTime.map((item) => item.elementValue[0].value)
    );

    //get min temperature
    const minTemp = Math.min(
      ...tempInTime.map((item) => item.elementValue[0].value)
    );

    //get maximum in array
    const maxDiff = Math.max(...diffArray);

    setData({
      ...{
        maxTemp,
        minTemp,
        maxDiff,
      },
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" flex flex-col rounded-xl px-4 py-2 my-3 shadow bg-white text-green-600">
      <p>
        {"最高溫:"}
        <span className="text-xl font-bold">{data.maxTemp}</span>
        {"°C"}
      </p>
      <p>
        {"最低溫:"}
        <span className="text-xl font-bold">{data.minTemp}</span>
        {"°C"}
      </p>
      <p>
        {"最大單日溫差:"}
        <span className="text-xl font-bold">{data.maxDiff}</span>
        {"°C"}
      </p>
    </div>
  );
}
