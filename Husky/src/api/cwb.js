import { CWB } from "../config";
import Api from "./api";

class CWBApi extends Api {
  constructor() {
    super();
    this.token = CWB.token;
    this.host = CWB.host;
  }

  static format(data) {
    const now = new Date();
    return data.records.location
      .filter((site) => (now - new Date(site.time.obsTime)) / 1000 / 60 < 90)
      .map((site) => {
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
      });
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
    return CWBApi.format(data);
  }
}

export { CWBApi };
