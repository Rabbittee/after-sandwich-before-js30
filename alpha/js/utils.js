export const getElementValue = (obj, key) =>
  obj.find((weatherElement) => weatherElement.elementName === key).elementValue;

export const getParameterValue = (obj, key) => 
  obj.find((parameter) => parameter.parameterName === key).parameterValue;
