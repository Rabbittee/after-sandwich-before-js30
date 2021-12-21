import { CWB } from "../config";
import Api from "./api";

const currentMapping = (site) => {
  site.weather = site.weatherElement.reduce((acc, curr) => {
    acc[curr.elementName] = Number(curr.elementValue);
    return acc;
  }, {});
  site.parameter = site.parameter.reduce((acc, curr) => {
    acc[curr.parameterName] = curr.parameterValue;
    return acc;
  }, {});
  site.obsTime = site.time.obsTime;
  site.lat = Number(site.lat);
  site.lon = Number(site.lon);
  delete site.time;
  delete site.weatherElement;
  return site;
};

const currentFormat = (data) => {
  const now = new Date();
  // .filter((site) => (now - new Date(site.time.obsTime)) / 1000 / 60 < 90)
  return data.records.location.map(currentMapping);
};

const forecastFormat = (data, locationName) => {
  return data.records.locations[0].location.find(
    (location) => location.locationName === locationName
  ).weatherElement;
};

class CWBApi extends Api {
  constructor() {
    super();
    this.token = CWB.token;
    this.host = CWB.host;
  }

  async getCurrent(selectElement = [], datastore = "weather") {
    const { apiPath, elementName } = CWB.datastore[datastore];
    selectElement = elementName.filter((name) => selectElement.includes(name));

    const query = {
      elementName: selectElement.join(","),
      parameterName: "CITY,TOWN",
      Authorization: this.token,
    };

    const data = await this.fetch(apiPath, query);
    return currentFormat(data);
  }

  async getForecast(selectElement = [], locationName = "臺北市") {
    const datastore = "forecast";
    const { apiPath, elementName } = CWB.datastore[datastore];
    selectElement = elementName.filter((name) => selectElement.includes(name));
    const query = {
      elementName: selectElement.join(","),
      locationName: locationName,
      Authorization: this.token,
    };
    const data = await this.fetch(apiPath, query);
    return forecastFormat(data, locationName);
  }
}

export { CWBApi };
