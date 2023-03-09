import {fireEvent, render, screen} from "@testing-library/react";
import DashboardHeader, {IDashboardHeaderProps} from "./DashboardHeader";

describe("<LoggerHeader /> Test", (): void => {
  const getSearchInput = (): HTMLInputElement => screen.getByPlaceholderText<HTMLInputElement>(/Search for country/);

  const props: IDashboardHeaderProps = {
    searchTerm: "",
    onSearchTermChange: jest.fn(),
    globalStatistics: {
      totalConfirmed: 10,
      totalDeaths: 2,
      totalRecovered: 8,
    },
  };

  it("should have the global-statistics title", (): void => {
    render(<DashboardHeader {...props} />);

    screen.getByText("Global Statistics:");
  });

  it("should have the total-confirmed statistic value", (): void => {
    render(<DashboardHeader {...props} />);

    screen.getByText(`Confirmed: ${props.globalStatistics.totalConfirmed}`);
  });

  it("should have the total-death statistic value", (): void => {
    render(<DashboardHeader {...props} />);

    screen.getByText(`Death: ${props.globalStatistics.totalDeaths}`);
  });

  it("should have the total-recovered statistic value", (): void => {
    render(<DashboardHeader {...props} />);

    screen.getByText(`Recovered: ${props.globalStatistics.totalRecovered}`);
  });

  it("should have the search input", (): void => {
    render(<DashboardHeader {...props} />);

    getSearchInput();
  });

  it("should raise the search input value to the parent component when a change occur", (): void => {
    render(<DashboardHeader {...props} />);

    fireEvent.change(getSearchInput(), {target: {value: "jordan"}});

    expect(props.onSearchTermChange).toBeCalledWith("jordan");
  });
});
