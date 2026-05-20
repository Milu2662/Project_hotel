import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/Home";

import HotelDetalle from "../pages/HotelDetalle";

function AppRouter() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/hoteles/:id"
          element={<HotelDetalle />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default AppRouter;