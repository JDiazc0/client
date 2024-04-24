import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import RawMaterials from "./pages/RawMaterials";
import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import CreateOrder from "./pages/CreateOrder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<CreateOrder />}></Route>
        <Route path="/lista-pedidos" exact element={<h1>Pedidos</h1>}></Route>
        <Route path="/lista-clientes" exact element={<h1>Clientes</h1>}></Route>
        <Route path="/productos" exact element={<Products />}></Route>
        <Route path="/inventario" exact element={<Inventory />}></Route>
        <Route path="/balance" exact element={<h1>balance</h1>}></Route>
        <Route path="/materias-primas" exact element={<RawMaterials />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
