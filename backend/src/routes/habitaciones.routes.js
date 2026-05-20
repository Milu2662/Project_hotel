const express = require("express");

const router = express.Router();

const pool = require("../config/db");

/* =========================================
   HABITACIONES POR HOTEL
========================================= */

router.get(
  "/hotel/:idHotel",
  async (req, res) => {

    try {

      const { idHotel } =
        req.params;

      console.log(
        "HOTEL RECIBIDO:",
        idHotel
      );

      const result =
        await pool.query(
          `
          SELECT
            h.num_hab,
            th.nombre,
            th.precio
          FROM habitacion h
          INNER JOIN tipo_habitacion th
            ON h.id_tipo_hab = th.id_tip_hab
          WHERE h.id_hotel = $1
          ORDER BY h.num_hab
          `,
          [idHotel]
        );

      console.log(
        "HABITACIONES:",
        result.rows
      );

      res.json(
        result.rows
      );

    } catch (error) {

      console.error(
        "ERROR HABITACIONES:",
        error
      );

      res.status(500).json({
        message:
          "Error obteniendo habitaciones"
      });

    }

  }
);

module.exports = router;