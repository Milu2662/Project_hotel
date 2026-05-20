const express = require("express");

const router = express.Router();

const pool = require("../config/db");

/* ======================================================
   HOTELES
====================================================== */

// OBTENER HOTELES

router.get(
  "/hoteles",
  async (req, res) => {

    try {

      const result =
        await pool.query(`
          SELECT
            h.id_hotel,
            h.nombre,
            h.direccion,
            l.nombre AS lugar

          FROM hotel h

          INNER JOIN lugar l
          ON h.id_lugar = l.id_lugar

          ORDER BY h.id_hotel DESC
        `);

      res.json(
        result.rows
      );

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Error obteniendo hoteles"
      });

    }

  }
);

// CREAR HOTEL

router.post(
  "/hoteles",
  async (req, res) => {

    try {

      const {
        nombre,
        direccion,
        id_lugar
      } = req.body;

      /* =========================
         CREAR HOTEL
      ========================= */

      const hotel =
        await pool.query(

          `
          INSERT INTO hotel
          (
            nombre,
            direccion,
            id_lugar
          )

          VALUES ($1, $2, $3)

          RETURNING *
          `,
          [
            nombre,
            direccion,
            id_lugar
          ]
        );

      const nuevoHotel =
        hotel.rows[0];

      /* =========================
         CREAR HABITACIONES
      ========================= */

      await pool.query(
        `
        INSERT INTO habitacion
        (
          id_hotel,
          num_hab,
          id_tipo_hab
        )

        VALUES

        ($1, 101, 1),
        ($1, 102, 2),
        ($1, 103, 3)
        `,
        [
          nuevoHotel.id_hotel
        ]
      );

      res.json({
        message:
          "Hotel y habitaciones creadas",
        hotel:
          nuevoHotel
      });

    } catch (error) {

      console.error(
        "ERROR CREANDO HOTEL:",
        error
      );

      res.status(500).json({
        message:
          "Error creando hotel"
      });

    }

  }
);

// ELIMINAR HOTEL

router.delete(
  "/hoteles/:id",
  async (req, res) => {

    try {

      await pool.query(
        `
        DELETE FROM hotel
        WHERE id_hotel = $1
        `,
        [req.params.id]
      );

      res.json({
        message:
          "Hotel eliminado"
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Error eliminando hotel"
      });

    }

  }
);

// HOTELES POR LUGAR

router.get(
  "/hoteles/lugar/:id",
  async (req, res) => {

    try {

      const result =
        await pool.query(
          `
          SELECT *
          FROM hotel
          WHERE id_lugar = $1
          `,
          [req.params.id]
        );

      res.json(
        result.rows
      );

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Error obteniendo hoteles"
      });

    }

  }
);

/* ======================================================
   LUGARES
====================================================== */

router.get(
  "/lugares",
  async (req, res) => {

    try {

      const result =
        await pool.query(`
          SELECT *
          FROM lugar
          ORDER BY nombre
        `);

      res.json(
        result.rows
      );

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Error obteniendo lugares"
      });

    }

  }
);

/* ======================================================
   USUARIOS
====================================================== */

// OBTENER USUARIOS

router.get(
  "/usuarios",
  async (req, res) => {

    try {

      const result =
        await pool.query(`
          SELECT
            u.id_usuario,
            u.nombre_completo,
            u.correo,
            u.usuario,

            t.rol

          FROM usuarios u

          INNER JOIN tipo_usuario t
          ON u.id_tipo_usuario =
             t.id_tipo_usuario

          ORDER BY u.id_usuario DESC
        `);

      res.json(
        result.rows
      );

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Error obteniendo usuarios"
      });

    }

  }
);

// CREAR USUARIO

router.post(
  "/usuarios",
  async (req, res) => {

    try {

      const {
        nombre_completo,
        correo,
        usuario,
        password,
        fecha_nacimiento,
        id_tipo_usuario
      } = req.body;

      if (
        !nombre_completo ||
        !correo ||
        !usuario ||
        !password ||
        !id_tipo_usuario
      ) {

        return res.status(400).json({
          message:
            "Todos los campos son obligatorios"
        });

      }

      const bcrypt =
        require("bcrypt");

      const salt =
        await bcrypt.genSalt(10);

      const password_hash =
        await bcrypt.hash(
          password,
          salt
        );

      const result =
        await pool.query(
          `
          INSERT INTO usuarios
          (
            nombre_completo,
            correo,
            usuario,
            password_hash,
            salt,
            fecha_nacimiento,
            id_tipo_usuario
          )

          VALUES
          (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7
          )

          RETURNING *
          `,
          [
            nombre_completo,
            correo,
            usuario,
            password_hash,
            salt,
            fecha_nacimiento,
            id_tipo_usuario
          ]
        );

      res.status(201).json(
        result.rows[0]
      );

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Error creando usuario"
      });

    }

  }
);

// ELIMINAR USUARIO

router.delete(
  "/usuarios/:id",
  async (req, res) => {

    try {

      await pool.query(
        `
        DELETE FROM usuarios
        WHERE id_usuario = $1
        `,
        [req.params.id]
      );

      res.json({
        message:
          "Usuario eliminado"
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Error eliminando usuario"
      });

    }

  }
);

/* ======================================================
   EXTRAS
====================================================== */

router.get(
  "/extras",
  async (req, res) => {

    try {

      const result =
        await pool.query(`
          SELECT *
          FROM extras
          ORDER BY nombre
        `);

      res.json(
        result.rows
      );

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Error obteniendo extras"
      });

    }

  }
);

/* ======================================================
   HABITACIONES
====================================================== */

router.get(
  "/habitaciones/hotel/:id",
  async (req, res) => {

    try {

      const { id } = req.params;

      const result =
        await pool.query(
          `
          SELECT
            h.num_hab,
            th.nombre AS tipo_habitacion,
            th.precio
          FROM habitacion h
          INNER JOIN tipo_habitacion th
            ON h.id_tipo_hab = th.id_tipo_hab
          WHERE h.id_hotel = $1
          ORDER BY h.num_hab ASC
          `,
          [id]
        );

      res.json(result.rows);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Error obteniendo habitaciones"
      });

    }

  }
);

/* ======================================================
   RESERVAS
====================================================== */

// OBTENER RESERVAS

router.get(
  "/reservas",
  async (req, res) => {

    try {

      const result =
        await pool.query(`
          SELECT
            r.id_reserva,
            r.fecha_inicio,
            r.fecha_fin,
            r.total,
            r.estado,

            u.nombre_completo,

            h.nombre AS hotel,

            rh.num_hab

          FROM reserva r

          INNER JOIN usuarios u
          ON r.id_usuario =
             u.id_usuario

          INNER JOIN reserva_habitacion rh
          ON r.id_reserva =
             rh.id_reserva

          INNER JOIN hotel h
          ON rh.id_hotel =
             h.id_hotel

          ORDER BY r.id_reserva DESC
        `);

      res.json(
        result.rows
      );

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Error obteniendo reservas"
      });

    }

  }
);

// CREAR RESERVA

router.post(
  "/reservas",
  async (req, res) => {

    try {

      const {
        id_usuario,
        id_hotel,
        num_hab,
        fecha_inicio,
        fecha_fin,
        estado,
        extras
      } = req.body;

      const room =
        await pool.query(
          `
          SELECT
            th.precio

          FROM habitacion h

          INNER JOIN tipo_habitacion th
          ON h.id_tipo_hab =
             th.id_tip_hab

          WHERE h.id_hotel = $1
          AND h.num_hab = $2
          `,
          [
            id_hotel,
            num_hab
          ]
        );

      if (
        room.rows.length === 0
      ) {

        return res.status(404).json({
          message:
            "Habitación no encontrada"
        });

      }

      let total =
        Number(
          room.rows[0].precio
        );

      if (
        extras &&
        extras.length > 0
      ) {

        const extrasQuery =
          await pool.query(
            `
            SELECT SUM(precio) AS total
            FROM extras
            WHERE id_extra = ANY($1)
            `,
            [extras]
          );

        total += Number(
          extrasQuery.rows[0]
            .total || 0
        );

      }

      const reserva =
        await pool.query(
          `
          INSERT INTO reserva
          (
            fecha_inicio,
            fecha_fin,
            total,
            estado,
            id_usuario
          )

          VALUES
          (
            $1,
            $2,
            $3,
            $4,
            $5
          )

          RETURNING *
          `,
          [
            fecha_inicio,
            fecha_fin,
            total,
            estado,
            id_usuario
          ]
        );

      await pool.query(
        `
        INSERT INTO reserva_habitacion
        (
          id_reserva,
          id_hotel,
          num_hab
        )

        VALUES
        (
          $1,
          $2,
          $3
        )
        `,
        [
          reserva.rows[0]
            .id_reserva,

          id_hotel,

          num_hab
        ]
      );

      if (
        extras &&
        extras.length > 0
      ) {

        for (const id_extra of extras) {

          await pool.query(
            `
            INSERT INTO reserva_extra
            (
              id_reserva,
              id_extra
            )

            VALUES
            (
              $1,
              $2
            )
            `,
            [
              reserva.rows[0]
                .id_reserva,

              id_extra
            ]
          );

        }

      }

      res.status(201).json({
        message:
          "Reserva creada correctamente"
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Error creando reserva"
      });

    }

  }
);

// ELIMINAR RESERVA

router.delete(
  "/reservas/:id",
  async (req, res) => {

    try {

      await pool.query(
        `
        DELETE FROM reserva
        WHERE id_reserva = $1
        `,
        [req.params.id]
      );

      res.json({
        message:
          "Reserva eliminada"
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Error eliminando reserva"
      });

    }

  }
);

/* =========================================
   OBTENER HABITACIONES POR HOTEL
========================================= */

router.get(
  "/habitaciones/hotel/:id",
  async (req, res) => {

    try {

      const { id } = req.params;

      const result =
        await pool.query(
          `
          SELECT
            num_hab,
            tipo_habitacion,
            precio
          FROM habitacion
          WHERE id_hotel = $1
          ORDER BY num_hab ASC
          `,
          [id]
        );

      res.json(result.rows);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Error obteniendo habitaciones"
      });

    }

  }
);

/* =========================================
   OBTENER EXTRAS
========================================= */

router.get(
  "/extras",
  async (req, res) => {

    try {

      const result =
        await pool.query(
          `
          SELECT *
          FROM extras
          ORDER BY nombre ASC
          `
        );

      res.json(result.rows);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          "Error obteniendo extras"
      });

    }

  }
);

module.exports = router;