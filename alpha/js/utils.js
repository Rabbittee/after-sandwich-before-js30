export const getElementValue = (array, key) =>
  array.find((weatherElement) => weatherElement.elementName === key)
    .elementValue;

export const getElementTimeArray = (array, key) =>
  array.find((weatherElement) => weatherElement.elementName === key).time;

export const getTimeTempValue = (array) =>
  array.find((tempObj) => tempObj.measures === "攝氏度").value;

export const getParameterValue = (array, key) =>
  array.find((parameter) => parameter.parameterName === key).parameterValue;

export const getLocationValue = (array, key) =>
  array.find((locations) => locations.locationsName === key).location;

export const getMyLocationValue = (array, key) =>
  array.find((location) => location.locationName === key);
