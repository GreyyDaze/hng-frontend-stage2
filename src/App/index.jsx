import { Route, Routes } from "react-router-dom";
import { paths } from "../utils/paths";
import * as pages from "../utils/pages.js";

const App = () => {
  return (
    <Routes>
      <Route path={paths.productList} element={<pages.ProductListing />} />
      <Route path={paths.cart} element={<pages.Cart />} />
      <Route path={paths.checkout} element={<pages.Checkout />} />
      <Route
        path={paths.productDetail(":id")}
        element={<pages.ProductDetail />}
      />
    </Routes>
  );
};
export default App;
