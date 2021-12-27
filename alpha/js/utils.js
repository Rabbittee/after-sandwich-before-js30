export const getElementValue = (obj, key) =>
  obj.find((weatherElement) => weatherElement.elementName === key).elementValue;

export const getElementTimeArray = (obj, key) =>
  obj.find((weatherElement) => weatherElement.elementName === key).time;

export const getTimeTempValue = (obj) =>
  obj.find((tempObj) => tempObj.measures === '攝氏度').value;

export const getParameterValue = (obj, key) => 
  obj.find((parameter) => parameter.parameterName === key).parameterValue;

export const getLocationValue = (obj, key) => 
  obj.find((locations) => locations.locationsName === key).location;

export const getMyLocationValue = (obj, key) => 
  obj.find((location) => location.locationName === key);
