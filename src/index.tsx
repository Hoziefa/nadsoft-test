import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import reportWebVitals from "./reportWebVitals";

import App from "./App";

const queryClient = new QueryClient();

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <QueryClientProvider client={ queryClient }>
    <App />
  </QueryClientProvider>,
);

reportWebVitals();
