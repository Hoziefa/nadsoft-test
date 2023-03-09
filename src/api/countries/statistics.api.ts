import http from "../axios.config";
import { statisticsDto } from "./statistics.dto";

export interface IApiForm {
  Global: {
    TotalConfirmed: number;
    TotalDeaths: number;
    TotalRecovered: number;
  },
  Countries: {
    TotalConfirmed: number;
    TotalDeaths: number;
    TotalRecovered: number;
    Country: string;
  }[]
}

export interface ICountry {
  name: string;
  totalConfirmed: number;
  totalDeaths: number;
  totalRecovered: number;
}

export interface IStatistics {
  totalConfirmed: number;
  totalDeaths: number;
  totalRecovered: number;
  countries: ICountry[];
}

export const getStatistics = (): Promise<IStatistics | null> => {
  return http.get("/summary").then(statisticsDto);
};
