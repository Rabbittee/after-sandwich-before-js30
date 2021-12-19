export const CWB = {
  token: "CWB-34AC2BFB-2272-41E3-84FE-AAF40C0C42AA",
  host: "https://opendata.cwb.gov.tw",
  datastore: {
    weather: {
      apiPath: "api/v1/rest/datastore/O-A0001-001",
      elementName: [
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
      ],
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
    },
  },
};
