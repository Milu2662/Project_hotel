import { BrowserRouter, Routes, Route } from "react-router-dom";

import Inicio from "./pages/Inicio";
import Home from "./pages/Home";
import HotelDetalle from "./pages/HotelDetalle";
import Ofertas from "./pages/Ofertas";
import Contacto from "./pages/Contacto";
import Registro from "./pages/Registro";
import Login from "./pages/Login";
import MisReservas from "./pages/MisReservas";
import Admin from "./pages/Admin";
import AdminUsuarios from "./pages/AdminUsuarios";
import AdminHoteles from "./pages/AdminHoteles";
import AdminReservas from "./pages/AdminReservas";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Inicio />}
        />
        
        <Route
          path="/hoteles"
          element={<Home />}
        />

        <Route
          path="/hoteles/:id"
          element={<HotelDetalle />}
        />

        <Route
          path="/ofertas"
          element={<Ofertas />}
        />

        <Route
          path="/contacto"
          element={<Contacto />}
        />

        <Route
          path="/registro"
          element={<Registro />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/mis-reservas"
          element={<MisReservas />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />

        <Route
          path="/admin/usuarios"
          element={<AdminUsuarios />}
        />

        <Route
          path="/admin/hoteles"
          element={<AdminHoteles />}
        />

        <Route
          path="/admin/reservas"
          element={<AdminReservas />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;