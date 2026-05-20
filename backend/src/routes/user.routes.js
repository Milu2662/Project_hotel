const express = require("express");

const router = express.Router();

const pool =
  require("../config/db");

/* =========================
   OBTENER USUARIOS
========================= */

router.get(
  "/users",

  async (req, res) => {

    try {

      const users =
        await pool.query(
          `
          SELECT *
          FROM usuarios
          `
        );

      res.json(
        users.rows
      );

    } catch (error) {

      console.error(error);

      res.status(500).json({

        message:
          "Error obteniendo usuarios",

        error:
          error.message

      });

    }

  }
);

module.exports = router;