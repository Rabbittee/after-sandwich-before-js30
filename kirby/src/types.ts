export type ParameterName = "CITY" | "CITY_SN" | "TOWN" | "TOWN_SN";
export interface Parameter {
  parameterName: ParameterName;
  parameterValue: string;
}

export type LocationID =
  | "F-D0047-001"
  | "F-D0047-003"
  | "F-D0047-005"
  | "F-D0047-007"
  | "F-D0047-009"
  | "F-D0047-011"
  | "F-D0047-013"
  | "F-D0047-015"
  | "F-D0047-017"
  | "F-D0047-019"
  | "F-D0047-021"
  | "F-D0047-023"
  | "F-D0047-025"
  | "F-D0047-027"
  | "F-D0047-029"
  | "F-D0047-031"
  | "F-D0047-033"
  | "F-D0047-035"
  | "F-D0047-037"
  | "F-D0047-039"
  | "F-D0047-041"
  | "F-D0047-043"
  | "F-D0047-045"
  | "F-D0047-047"
  | "F-D0047-049"
  | "F-D0047-051"
  | "F-D0047-053"
  | "F-D0047-055"
  | "F-D0047-057"
  | "F-D0047-059"
  | "F-D0047-061"
  | "F-D0047-063"
  | "F-D0047-065"
  | "F-D0047-067"
  | "F-D0047-069"
  | "F-D0047-071"
  | "F-D0047-073"
  | "F-D0047-075"
  | "F-D0047-077"
  | "F-D0047-079"
  | "F-D0047-081"
  | "F-D0047-083"
  | "F-D0047-085"
  | "F-D0047-087"
  | "F-D0047-089"
  | "F-D0047-091";

export type WeatherElementName =
  | "ELEV"
  | "WDIR"
  | "WDSD"
  | "TEMP"
  | "HUMD"
  | "PRES"
  | "H_24R"
  | "H_FX"
  | "H_XD"
  | "H_FXT"
  | "D_TX"
  | "D_TXT"
  | "D_TN"
  | "D_TNT"
  | "RAIN"
  | "MIN_10"
  | "HOUR_3"
  | "HOUR_6"
  | "HOUR_12"
  | "HOUR_24"
  | "NOW"
  | "latest_2days"
  | "latest_3days"
  | "PoP12h"
  | "T"
  | "RH"
  | "MinCI"
  | "WS"
  | "MaxAT"
  | "Wx"
  | "MaxCI"
  | "MinT"
  | "UVI"
  | "WeatherDescription"
  | "MinAT"
  | "MaxT"
  | "WD"
  | "Td";

type BaseWeatherElement = {
  elementName: WeatherElementName;
};
type WeatherElementWithValue = BaseWeatherElement & { elementValue: string };
type WeatherElementWithTime = BaseWeatherElement & {
  time: {
    startTime: string;
    endTime: string;
    elementValue: { value: string }[];
  }[];
};

export type WeatherElement = WeatherElementWithValue | WeatherElementWithTime;

export interface Position {
  lon: number;
  lat: number;
}

export interface HasName {
  name: string;
}

export interface WeatherStation extends HasName {
  city: string;
  town: string;
}

export interface HasTemperature {
  temp: number;
}

export interface HasLocation {
  location: Position;
}

export interface HasAltitude {
  altitude: number;
}

export interface HasPrecipitation {
  precipitation: number;
}

export interface TimeRange {
  start: Date;
  end: Date;
}
