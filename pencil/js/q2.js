import getValue, { validation } from "./method.js";

const title = `
  題目二：
  同上，針對不同海拔高度找出最低溫測站，每 500m 一組，並回傳object
`;
const content = `
  (API: v1/rest/datastore/O-A0001-001)
`;

let heightArr = [];
let heightRangeArr = [];

function divideHeightRange(height, temp, locationName, data) {
  const heightRatio = Math.floor(height / 500);
  const range = `${heightRatio * 500}-${(heightRatio + 1) * 500}`;

  if (!heightRangeArr.includes(range)) {
    heightArr.push({
      heightRange: range,
      lowestTemp: temp,
      lowestTempLocation: locationName,
      data,
    });
    heightRangeArr.push(range);
  } else {
    let currentLowestTemp = getValue(
      heightArr,
      "heightRange",
      range,
      "lowestTemp"
    );
    if (temp < currentLowestTemp) {
      heightArr.forEach((item) => {
        if (item.heightRange === range) {
          item = {
            heightRange: range,
            lowestTemp: temp,
            lowestTempLocation: locationName,
            data,
          };
        }
      });
    }
  }
}

export default function q2(data) {
  data.forEach((item) => {
    const { weatherElement, locationName } = item;
    const height = getValue(
      weatherElement,
      "elementName",
      "ELEV",
      "elementValue"
    );
    const temp = getValue(
      weatherElement,
      "elementName",
      "TEMP",
      "elementValue"
    );
    if (!validation(temp)) return;
    divideHeightRange(height, temp, locationName, item);
    heightArr.sort((a, b) => {
      return a.heightRange.split("-")[0] - b.heightRange.split("-")[0];
    });
  });
  console.log("question02: ", heightArr);
}
