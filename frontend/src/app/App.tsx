import { RouterProvider } from "react-router";
import { QueryRouter } from "./router/queryRouter/QueryRouter";
import { WebRouter } from "./router/webRouter/WebRouter";
import "./styles/base/normalize.scss";
import "./styles/base/globals.scss";

function App() {
  return (
    <QueryRouter>
      <RouterProvider router={WebRouter} />
    </QueryRouter>
  );
}

export default App;
