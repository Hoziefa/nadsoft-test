import { IApiForm, ICountry, IStatistics } from "./statistics.api";

export const statisticsDto = (data: { data: IApiForm }): IStatistics | null => {
  if (!data || !data.data.Countries) return null;

  return {
    totalConfirmed: data.data.Global.TotalConfirmed,
    totalDeaths: data.data.Global.TotalDeaths,
    totalRecovered: data.data.Global.TotalRecovered,
    countries: data.data.Countries.map((country): ICountry => ({
      name: country.Country,
      totalConfirmed: country.TotalConfirmed,
      totalDeaths: country.TotalDeaths,
      totalRecovered: country.TotalRecovered,
    })),
  };
};
