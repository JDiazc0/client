import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import CreateRawMaterial from "./pages/CreateRawMaterial";
import CreateProduct from "./pages/CreateProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<h1>Crear pedido</h1>}></Route>
        <Route path="/lista-pedidos" exact element={<h1>Pedidos</h1>}></Route>
        <Route path="/lista-clientes" exact element={<h1>Clientes</h1>}></Route>
        <Route path="/materias-primas" exact element={<h1>MP</h1>}></Route>
        <Route path="/productos" exact element={<h1>productos</h1>}></Route>
        <Route path="/inventario" exact element={<h1>inventario</h1>}></Route>
        <Route path="/balance" exact element={<h1>balance</h1>}></Route>
        <Route
          path="/nueva-materia-prima"
          exact
          element={<CreateRawMaterial />}></Route>
        <Route path="/nuevo-producto" exact element={<CreateProduct />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
