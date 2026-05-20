const express = require("express");

const cors = require("cors");

const app = express();

/* =========================
   MIDDLEWARES
========================= */

app.use(cors());

app.use(express.json());

/* =========================
   RUTAS
========================= */

const authRoutes =
  require("./routes/auth.routes");

const hotelRoutes =
  require("./routes/hotel.routes");

const reservationRoutes =
  require("./routes/reservation.routes");

const userRoutes =
  require("./routes/user.routes");

const extraRoutes =
  require("./routes/extra.routes");

const adminRoutes =
  require("./routes/admin.routes");

const habitacionesRoutes =
  require("./routes/habitaciones.routes");  

/* =========================
   USE ROUTES
========================= */

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api",
  hotelRoutes
);

app.use(
  "/api",
  reservationRoutes
);

app.use(
  "/api",
  userRoutes
);

app.use(
  "/api/extras",
  extraRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/habitaciones",
  habitacionesRoutes
);


/* =========================
   SERVER
========================= */

const PORT =
  process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(
    `Servidor corriendo en puerto ${PORT}`
  );

});