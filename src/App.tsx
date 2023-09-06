import { Route, Routes } from "react-router-dom";
import ShoppingCartList from "./modules/shoppingCart/pages/shoppingCartList";
import ProductsList from "./modules/shoppingCartProducts/pages/productsList";

function App() {
  return (
    <Routes>
      <Route path="/*">
        <Route index element={<ShoppingCartList />} />
        <Route path=":shoppingCartId" element={<ProductsList />} />
      </Route>
    </Routes>
  );
}

export default App;
