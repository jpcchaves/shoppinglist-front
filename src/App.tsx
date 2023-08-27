import { Route, Routes } from "react-router-dom";
import ShoppingCartList from "./modules/shoppingCart/pages/shoppingCartList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ShoppingCartList />} />
    </Routes>
  );
}

export default App;
