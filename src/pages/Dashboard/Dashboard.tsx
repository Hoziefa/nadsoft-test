import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { message, Table, TablePaginationConfig, Typography } from "antd";

import DashboardHeader, { IGlobalStatistics } from "./DashboardHeader";
import { getStatistics, ICountry } from "../../api/countries";

import "./Dashboard.scss";

const PAGE_SIZE = 10;

const Dashboard: React.FC = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [globalStatistics, setGlobalStatistics] = useState<IGlobalStatistics>({} as IGlobalStatistics);
  const [countriesStatistics, setCountriesStatistics] = useState<ICountry[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string | null>(searchParams.get("name"));

  const { data, isLoading, isSuccess, isError, error } = useQuery("statistics", getStatistics, { staleTime: Infinity });

  const paginationConfig = useMemo((): TablePaginationConfig => ({
    pageSize: PAGE_SIZE,
    current: currentPage,
    position: ["bottomCenter"],
    showSizeChanger: false,
    onChange: setCurrentPage,
  }), [currentPage]);

  const searchCountries = useCallback((searchTerm: string): ICountry[] => {
    return data!.countries.filter(({ name }): boolean => name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [data]);

  const onSearchTermChange = useCallback((searchTerm: string): void => {
    setCountriesStatistics(searchCountries(searchTerm));
    setSearchTerm(searchTerm);
    setSearchParams({ name: searchTerm });
    setCurrentPage(1);
  }, [searchCountries, setSearchParams]);

  useEffect((): void => {
    if (!isSuccess) return;

    setGlobalStatistics({ totalConfirmed: data!.totalConfirmed, totalDeaths: data!.totalDeaths, totalRecovered: data!.totalRecovered });
    setCountriesStatistics(data!.countries!);
  }, [data, isSuccess]);

  // Handle if an error occurs on the API display a friendly message to the user
  useEffect((): void => {
    if (isError) message.error((error as Error).message);
  }, [isError, error]);

  // Handle set the query-param when the component mounts, and filter the countries accordingly (to persist user search even after refresh)
  useEffect((): void => {
    if (!isSuccess) return;

    if (searchTerm) setCountriesStatistics(searchCountries(searchTerm));
  }, [isSuccess]);

  return (
    <Table
      rowKey="name"
      className="dashboard-table"
      dataSource={ countriesStatistics }
      loading={ isLoading }
      pagination={ paginationConfig }
      caption={ <DashboardHeader searchTerm={ searchTerm! } onSearchTermChange={ onSearchTermChange } globalStatistics={ globalStatistics } /> }
    >
      <Table.Column
        title="Country"
        sorter={ (a: ICountry, b: ICountry) => a.name.localeCompare(b.name) }
        render={ (_, record: ICountry) => <Typography.Text>{ record.name }</Typography.Text> }
      />

      <Table.Column
        title="Confirmed"
        sorter={ (a: ICountry, b: ICountry): number => a.totalConfirmed - b.totalConfirmed }
        render={ (_, record: ICountry) => <Typography.Text>{ record.totalConfirmed }</Typography.Text> }
      />

      <Table.Column
        title="Death"
        sorter={ (a: ICountry, b: ICountry) => a.totalDeaths - b.totalDeaths }
        render={ (_, record: ICountry) => <Typography.Text>{ record.totalDeaths }</Typography.Text> }
      />

      <Table.Column
        title="Recovered"
        sorter={ (a: ICountry, b: ICountry): number => a.totalRecovered - b.totalRecovered }
        render={ (_, record: ICountry) => <Typography.Text>{ record.totalRecovered }</Typography.Text> }
      />
    </Table>
  );
};

export default Dashboard;