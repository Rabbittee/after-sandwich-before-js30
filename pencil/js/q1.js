import getValue from "./method.js";

const title = `
  題目一：
  找到全台當下最低溫的點，並列出
`;
const content = `
  縣市
  行政區
  測站名稱
  溫度
  座標
  (透過中央氣象局 API 取得全台測站即時資料)
  (API: v1/rest/datastore/O-A0001-001)
`;

export default function q1(data) {
  let lowestTempData = {};
  let lowestTemp = Infinity;
  data.forEach((item) => {
    const { parameter, locationName, lon, lat } = item;
    const temp = getValue(
      item.weatherElement,
      "elementName",
      "TEMP",
      "elementValue"
    );
    if (!!temp && temp < lowestTemp) {
      lowestTemp = temp;
      lowestTempData = {
        city: getValue(parameter, "parameterName", "CITY", "parameterValue"),
        town: getValue(parameter, "parameterName", "TOWN", "parameterValue"),
        name: locationName,
        temp,
        location: {
          lon,
          lat,
        },
      };
    }
  });
  console.log("question01: ", lowestTempData);
}
