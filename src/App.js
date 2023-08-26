import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import RootPage from "./pages/Root";
import ExerciseDetailPage from "./pages/ExerciseDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "exercise/:exerciseId",
        element: <ExerciseDetailPage />,
      },
    ],
  },
]);

function App() {
  return (
    <React.Fragment>
      <RouterProvider router={router}></RouterProvider>
    </React.Fragment>
  );
}

export default App;
