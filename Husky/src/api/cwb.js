import { CWB } from "../config";
import Api from "./api";

const currentMapping = (site) => {
  const { time, weatherElement, ...rest } = site;
  rest.weather = weatherElement.reduce((acc, curr) => {
    acc[curr.elementName] = Number(curr.elementValue);
    return acc;
  }, {});
  rest.parameter = rest.parameter.reduce((acc, curr) => {
    acc[curr.parameterName] = curr.parameterValue;
    return acc;
  }, {});
  rest.obsTime = time.obsTime;
  rest.lat = Number(rest.lat);
  rest.lon = Number(rest.lon);
  return rest;
};

const currentFormat = (data) => {
  // There may be a long delay in updating the observation time of CWB API data
  // Otherwise, it should be filtered stations that have not reported for a long time
  // ex. filter data obsTime over 90 minutes
  // const now = new Date();
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
  }
  get token() {
    return CWB.token;
  }
  get host() {
    return CWB.host;
  }

  static datastoreParameter(datastore) {
    const { apiPath, elementName } = CWB.datastore[datastore];
    return {
      apiPath,
      elementName,
    };
  }

  async getCurrent(selectElement = [], datastore = "weather") {
    const { apiPath, elementName } = CWBApi.datastoreParameter(datastore);
    const allowSelectElement = elementName.filter((name) =>
      selectElement.includes(name)
    );

    const query = {
      elementName: allowSelectElement.join(","),
      parameterName: "CITY,TOWN",
      Authorization: this.token,
    };

    const data = await this.fetch(apiPath, query);
    return currentFormat(data);
  }

  async getForecast(selectElement = [], locationName = "臺北市") {
    const datastore = "forecast";
    const { apiPath, elementName } = CWBApi.datastoreParameter(datastore);
    const allowSelectElement = elementName.filter((name) =>
      selectElement.includes(name)
    );
    const query = {
      elementName: allowSelectElement.join(","),
      locationName: locationName,
      Authorization: this.token,
    };
    const data = await this.fetch(apiPath, query);
    return forecastFormat(data, locationName);
  }
}

export { CWBApi };
