export function validation(data) {
  const invalid = "-99";
  return data !== undefined && data !== invalid && data !== null ? true : false;
}

/**
 * @function pass search params
 * @param { Array } data
 * @param { String } property
 * @param { String } propertyName
 * @param { String } target
 */
export default function getValue(
  data = [],
  property = "",
  propertyName = "",
  target = ""
) {
  let returnValue = null;
  data.find((item) => {
    if (item[property] === propertyName) {
      let result = item[target];
      if (validation(result)) {
        returnValue = result;
      }
    }
  });
  return returnValue;
}
