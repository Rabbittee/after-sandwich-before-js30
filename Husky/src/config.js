export const CWB = {
  token: "CWB-34AC2BFB-2272-41E3-84FE-AAF40C0C42AA",
  host: "https://opendata.cwb.gov.tw",
  datastore: {
    weather: {
      apiPath: "api/v1/rest/datastore/O-A0003-001",
      elementName: [
        "TIME",
        "ELEV",
        "WDIR",
        "WDSD",
        "TEMP",
        "HUMD",
        "PRES",
        "24R",
        "H_FX",
        "H_XD",
        "H_FXT",
        "H_F10",
        "H_10D",
        "H_F10T",
        "H_UVI",
        "D_TX",
        "D_TXT",
        "D_TN",
        "D_TNT",
        "D_TS",
        "VIS",
        "Weather",
      ],
      noData: -99,
    },
    precipitation: {
      apiPath: "api/v1/rest/datastore/O-A0002-001",
      elementName: [
        "ELEV",
        "RAIN",
        "MIN_10",
        "HOUR_3",
        "HOUR_6",
        "HOUR_12",
        "HOUR_24",
        "NOW",
      ],
      noData: -999,
    },
    forecast: {
      apiPath: "api/v1/rest/datastore/F-D0047-089",
      elementName: [
        "Wx",
        "PoP12h",
        "AT",
        "T",
        "RH",
        "CI",
        "WeatherDescription",
        "PoP6h",
        "WS",
        "WD",
        "Td",
      ],
    },
  },
};