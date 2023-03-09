import {createBrowserRouter} from "react-router-dom";
import Dashboard from "../pages/Dashboard";

export const routes = createBrowserRouter([
  {path: "/", element: <Dashboard />},
]);
