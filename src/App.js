import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import RawMaterials from "./pages/RawMaterials";
import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import CreateOrder from "./pages/CreateOrder";
import Clients from "./pages/Clients";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Balance from "./pages/Balance";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<CreateOrder />}></Route>
        <Route path="/lista-pedidos" exact element={<Orders />}></Route>
        <Route path="/lista-clientes" exact element={<Clients />}></Route>
        <Route path="/productos" exact element={<Products />}></Route>
        <Route path="/inventario" exact element={<Inventory />}></Route>
        <Route path="/balance" exact element={<Balance />}></Route>
        <Route path="/materias-primas" exact element={<RawMaterials />}></Route>
        <Route
          path="/detalles-pedido/:id"
          exact
          element={<OrderDetails />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
