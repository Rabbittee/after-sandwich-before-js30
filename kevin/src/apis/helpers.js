export const unAvailableValue = -99;

export const getElementValueByKey = (ary, key) => ary.find(element => element.elementName === key).elementValue;

export const getTimeByKey = (ary, key) => ary.find(element => element.elementName === key).time;

export const getParameterValueByKey = (ary, key) => ary.find(element => element.parameterName === key).parameterValue;

export const dealAvailableValue = value => (Number(value) === unAvailableValue ? null : value);
