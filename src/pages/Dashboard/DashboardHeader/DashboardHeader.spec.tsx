import {render, screen} from "@testing-library/react";
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

  it("should have the search input", (): void => {
    render(<DashboardHeader {...props} />);

    getSearchInput();
  });
});
