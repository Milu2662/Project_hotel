const express = require("express");

const router = express.Router();

const bcrypt = require("bcrypt");

const pool = require("../config/db");

// LOGIN
router.post("/login", async (req, res) => {

  try {

    const {
      correo,
      password
    } = req.body;

    const result = await pool.query(
      `
      SELECT *
      FROM usuarios
      WHERE correo = $1
      `,
      [correo]
    );

    if (result.rows.length === 0) {

      return res.status(401).json({
        message: "Usuario no encontrado"
      });

    }

    const user = result.rows[0];

    // VALIDAR PASSWORD

    const passwordCorrecta =
      await bcrypt.compare(
        password,
        user.password_hash
      );

    if (!passwordCorrecta) {

      return res.status(401).json({
        message: "Contraseña incorrecta"
      });

    }

    return res.json({

      token: "token_fake",

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

    return res.status(500).json({
      message: "Error login"
    });

  }

});

module.exports = router;