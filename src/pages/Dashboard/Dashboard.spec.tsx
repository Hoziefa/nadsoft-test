import {fireEvent, render, screen} from "@testing-library/react";
import {QueryClient, QueryClientProvider} from "react-query";
import {rest} from "msw";
import {setupServer} from "msw/node";

import Dashboard from "./Dashboard";
import {IApiForm} from "../../api/countries";
import {MemoryRouter} from "react-router-dom";

const statisticsHandler = rest.get("https://api.covid19api.com/summary", (req, res, ctx) => {
  return res(
    ctx.status(202),
    ctx.json<IApiForm>({
      Global: {
        TotalConfirmed: 10,
        TotalDeaths: 2,
        TotalRecovered: 8,
      },
      Countries: [
        {
          Country: "Jordan",
          TotalConfirmed: 100,
          TotalDeaths: 20,
          TotalRecovered: 80,
        },
        {
          Country: "Saudi Arabia",
          TotalConfirmed: 200,
          TotalDeaths: 50,
          TotalRecovered: 50,
        },
      ],
    }),
  );
});

const server = setupServer(statisticsHandler);

const renderWithQuery = (queryClient: QueryClient) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["?name="]}>
        <Dashboard />
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

describe("<Dashboard /> Test", (): void => {
  const queryClient = new QueryClient();

  beforeAll((): void => {
    server.listen();
  });

  afterAll((): void => {
    server.close();
  });

  it("should integrate with the DashboardHeader", (): void => {
    renderWithQuery(queryClient);

    screen.getByTestId("dashboard-header");
  });

  it("should have the global-statistics", (): void => {
    renderWithQuery(queryClient);

    screen.getByText("Confirmed: 10");
    screen.getByText("Death: 2");
    screen.getByText("Recovered: 8");
  });

  it("should filter the countries based on the search-input value", (): void => {
    renderWithQuery(queryClient);

    fireEvent.change(screen.getByRole("textbox"), {target: {value: "Jordan"}});

    screen.getByText("Jordan");
    expect(screen.queryByText("Saudi Arabia")).toBeNull();
  });

  it("should have the county-name column (label&value)", (): void => {
    renderWithQuery(queryClient);

    screen.getByRole("columnheader", {name: "Country"});
    screen.getByRole("cell", {name: "Jordan"});
  });

  it("should have the confirmed-cases column (label&value)", (): void => {
    renderWithQuery(queryClient);

    screen.getByRole("columnheader", {name: "Confirmed"});
    screen.getByRole("cell", {name: "100"});
  });

  it("should have the death-cases column (label&value)", (): void => {
    renderWithQuery(queryClient);

    screen.getByRole("columnheader", {name: "Death"});
    screen.getByRole("cell", {name: "20"});
  });

  it("should have the recovered-cases column (label&value)", (): void => {
    renderWithQuery(queryClient);

    screen.getByRole("columnheader", {name: "Recovered"});
    screen.getByRole("cell", {name: "80"});
  });
});
