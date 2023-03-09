import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { rest } from "msw";
import { setupServer } from "msw/node";

import Dashboard from "./Dashboard";
import { IApiForm } from "../../api/countries";

const logsHandler = rest.get("https://api.covid19api.com/summary", (req, res, ctx) => {
  return res(
    ctx.status(202),
    ctx.json<IApiForm>({
      Global: {
        TotalConfirmed: 10,
        TotalDeaths: 2,
        TotalRecovered: 8,
      },
      Countries: [],
    }),
  );
});

const server = setupServer(logsHandler);

const renderWithQuery = (queryClient: QueryClient) => {
  return render(
    <QueryClientProvider client={ queryClient }>
      <Dashboard />
    </QueryClientProvider>,
  );
};

describe("<Logger /> Test", (): void => {
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
});
