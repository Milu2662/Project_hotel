import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

/* PAGES */

import Inicio from "./pages/Inicio";
import Home from "./pages/Home";
import HotelDetalle from "./pages/HotelDetalle";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AdminHotels from "./pages/AdminHotels";
import AdminUsers from "./pages/AdminUsers";
import AdminReservations from "./pages/AdminReservations";
import ReceptionDashboard from "./pages/ReceptionDashboard";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* =========================
            PUBLIC
        ========================= */}

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
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* =========================
            ADMIN
        ========================= */}

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/hoteles"
          element={<AdminHotels />}
        />

        <Route
          path="/admin/usuarios"
          element={<AdminUsers />}
        />

        <Route
          path="/admin/reservas"
          element={<AdminReservations />}
        />

        {/* =========================
            RECEPCIONISTA
        ========================= */}

        <Route
          path="/recepcion"
          element={<ReceptionDashboard />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;