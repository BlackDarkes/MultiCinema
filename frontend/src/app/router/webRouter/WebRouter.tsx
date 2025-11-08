import { HomePage } from "@/pages/index";
import { createBrowserRouter } from "react-router";

export const WebRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);
