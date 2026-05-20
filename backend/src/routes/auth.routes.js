const express = require("express");

const router = express.Router();

const bcrypt = require("bcrypt");

const pool =
  require("../config/db");

/* =========================
   REGISTER
========================= */

router.post(
  "/registro",

  async (req, res) => {

    try {

      const {
        nombre_completo,
        correo,
        usuario,
        password,
        fecha_nacimiento
      } = req.body;

      /* =========================
         VALIDAR CAMPOS
      ========================= */

      if (
        !nombre_completo ||
        !correo ||
        !usuario ||
        !password ||
        !fecha_nacimiento
      ) {

        return res.status(400).json({

          message:
            "Todos los campos son obligatorios"

        });

      }

      /* =========================
         VALIDAR EXISTENCIA
      ========================= */

      const existingUser =
        await pool.query(

          `
          SELECT *

          FROM usuarios

          WHERE correo = $1
          OR usuario = $2
          `,
          [
            correo,
            usuario
          ]
        );

      if (
        existingUser.rows.length > 0
      ) {

        return res.status(400).json({

          message:
            "Correo o usuario ya existen"

        });

      }

      /* =========================
         HASH PASSWORD
      ========================= */

      const salt =
        await bcrypt.genSalt(10);

      const password_hash =
        await bcrypt.hash(
          password,
          salt
        );

      /* =========================
         INSERT USER
      ========================= */

      const result =
        await pool.query(

          `
          INSERT INTO usuarios
          (
            nombre_completo,
            correo,
            usuario,
            password_hash,
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
            1
          )

          RETURNING *
          `,
          [
            nombre_completo,
            correo,
            usuario,
            password_hash,
            fecha_nacimiento
          ]
        );

      res.status(201).json({

        message:
          "Usuario registrado correctamente",

        user:
          result.rows[0]

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        message:
          "Error registrando usuario"

      });

    }

  }
);

/* =========================
   LOGIN
========================= */

router.post(
  "/login",

  async (req, res) => {

    try {

      const {
        correo,
        password
      } = req.body;

      const result =
        await pool.query(

          `
          SELECT *

          FROM usuarios

          WHERE correo = $1
          `,
          [correo]
        );

      if (
        result.rows.length === 0
      ) {

        return res.status(401).json({

          message:
            "Usuario no encontrado"

        });

      }

      const user =
        result.rows[0];

      /* =========================
         VALIDAR PASSWORD
      ========================= */

      const passwordCorrecta =
        await bcrypt.compare(
          password,
          user.password_hash
        );

      if (!passwordCorrecta) {

        return res.status(401).json({

          message:
            "Contraseña incorrecta"

        });

      }

      res.json({

        token:
          "token_fake",

        user: {

          id_usuario:
            user.id_usuario,

          nombre:
            user.nombre_completo,

          correo:
            user.correo,

          usuario:
            user.usuario,

          id_tipo_usuario:
            user.id_tipo_usuario

        }

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Error login"

      });

    }

  }
);

module.exports =
  router;