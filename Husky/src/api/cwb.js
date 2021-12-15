export default class CWBApi {
  constructor(token) {
    this.token = token;
    this.cwbHost = "https://opendata.cwb.gov.tw";
  }

  async fetch(apiPath, query) {
    let searchParams = new URLSearchParams({
      ...{ Authorization: this.token },
      ...query,
    });

    const response = await fetch(
      `${this.cwbHost}/${apiPath}?${searchParams.toString()}`
    );
    return await response.json();
  }

  async getCurrentWeather(selectElement = []) {
    const now = new Date();
    const apiPath = "api/v1/rest/datastore/O-A0001-001";
    const elementsName = [
      "ELEV",
      "WDIR",
      "WDSD",
      "TEMP",
      "HUMD",
      "PRES",
      "SUN",
      "H_24R",
      "WS15M",
      "WD15M",
      "WS15T",
      "H_FXT",
      "D_TXT",
      "D_TNT",
    ];
    selectElement = elementsName.filter((name) => selectElement.includes(name));

    const query = {
      elementName: selectElement.join(","),
      parameterName: "CITY,TOWN",
    };

    const data = await this.fetch(apiPath, query);

    return data.records.location
      .filter((site) => (now - new Date(site.time.obsTime)) / 1000 / 60 < 90)
      .map((site) => {
        site.weather = site.weatherElement.reduce((acc, curr) => {
          acc[curr.elementName] = Number(curr.elementValue);
          return acc;
        }, {});
        delete site.weatherElement;
        return site;
      });
  }
}
