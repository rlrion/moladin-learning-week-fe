import React from "react";
import "./App.css";
import Main from "./pages/list/Main";
import Detail from "./pages/detail/Detail";
import Update from "./pages/update/Update";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/detail/:albumId",
    element: <Detail />,
  },
  {
    path: "/update/:type/:id",
    element: <Update />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
