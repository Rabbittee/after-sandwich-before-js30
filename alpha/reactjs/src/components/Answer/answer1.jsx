import { useState, useEffect } from "react";
import { fetchData } from "@/api/api";
import { city, town, temp } from "@/constant";

export function Answer1() {
  const apiPath = `O-A0001-001`;
  const [data, setData] = useState();
  const params = {
    parameterName: [city, town],
    elementName: temp,
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await fetchData(apiPath, params);
      console.log(res);
      setData(res.records.location[0].locationName);
    };
    fetch();
  }, []);
  console.log(data);

  return (
    <div className="bg-green-500 flex flex-col rounded-xl px-4 py-2 my-3 shadow text-white">
      <h6 className="text-md my-2">Answer:</h6>
      <div className="bg-white px-2 rounded-md text-green-500">
        <p>{import.meta.env.VITE_API_TOKEN}</p>
        <p>{data}</p>
      </div>
    </div>
  );
}
