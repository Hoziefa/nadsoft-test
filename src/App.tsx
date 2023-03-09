import React from "react";
import {RouterProvider} from "react-router-dom";
import {routes} from "./routes";

const App = (): JSX.Element => <RouterProvider router={routes} />;

export default App;
