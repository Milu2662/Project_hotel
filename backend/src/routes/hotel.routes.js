const express = require("express");

const router = express.Router();

const pool =
  require("../config/db");

/* =========================
   TODOS LOS HOTELES
========================= */

router.get(
  "/hoteles",

  async (req, res) => {

    try {

      const hoteles =
        await pool.query(
          `
          SELECT
            h.id_hotel,
            h.nombre,
            h.direccion,

            l.nombre
            AS ciudad

          FROM hotel h

          LEFT JOIN lugar l
          ON h.id_lugar =
             l.id_lugar

          ORDER BY h.id_hotel
          `
        );

      res.json(
        hoteles.rows
      );

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Error obteniendo hoteles",
      });

    }

  }
);

/* =========================
   HOTEL POR ID
========================= */

router.get(
  "/hoteles/:id",

  async (req, res) => {

    try {

      const { id } =
        req.params;

      const hotel =
        await pool.query(
          `
          SELECT
            h.id_hotel,
            h.nombre,
            h.direccion,

            l.nombre
            AS ciudad

          FROM hotel h

          LEFT JOIN lugar l
          ON h.id_lugar =
             l.id_lugar

          WHERE h.id_hotel = $1
          `,
          [id]
        );

      if (
        hotel.rows.length === 0
      ) {

        return res.status(404).json({
          message:
            "Hotel no encontrado",
        });

      }

      res.json(
        hotel.rows[0]
      );

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Error obteniendo hotel",
      });

    }

  }
);

/* =========================
   HABITACIONES
========================= */

router.get(
  "/rooms/hotel/:id",

  async (req, res) => {

    try {

      const { id } =
        req.params;

      const rooms =
        await pool.query(
          `
          SELECT
            h.num_hab,

            th.nombre,

            th.precio,

            th.cant_pers

          FROM habitacion h

          INNER JOIN tipo_habitacion th
          ON h.id_tipo_hab =
             th.id_tip_hab

          WHERE h.id_hotel = $1

          ORDER BY h.num_hab
          `,
          [id]
        );

      res.json(
        rooms.rows
      );

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Error obteniendo habitaciones",
      });

    }

  }
);

module.exports = router;