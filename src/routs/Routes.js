import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ViewCard from "../components/ViewCard";
import CreateCard from "../components/createCard/CreateCard";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/card/:id",
    element: <ViewCard />,
  },
  {
    path: "/createCard",
    element: <CreateCard />,
  },
]);

export default Routes;
