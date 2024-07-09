import { Route, Routes } from "react-router-dom";
import { paths } from "../utils/paths";
import * as pages from "../utils/pages.js";

const App = () => {
  return (
    <Routes>
      <Route path={paths.productList} element={<pages.ProductListing />} />
      <Route path={paths.cart} element={<pages.Cart />} />
    </Routes>
  );
};
export default App;
