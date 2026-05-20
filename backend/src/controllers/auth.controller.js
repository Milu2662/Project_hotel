const pool = require("../config/db");

const login = async (req, res) => {

  try {

    const { correo, password } =
      req.body;

    const result =
      await pool.query(
        `
        SELECT
          u.id_usuario,
          u.nombre_completo,
          u.correo,
          u.usuario,
          u.password_hash,
          u.id_tipo_usuario,
          t.rol
        FROM usuarios u
        JOIN tipo_usuario t
          ON u.id_tipo_usuario =
             t.id_tipo_usuario
        WHERE u.correo = $1
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

    // PASSWORD SIMPLE

    if (
      password !==
      user.password_hash
    ) {

      return res.status(401).json({
        message:
          "Contraseña incorrecta"
      });

    }

    res.json({

      token: "fake-token",

      user: {

        id_usuario:
          user.id_usuario,

        nombre:
          user.nombre_completo,

        correo:
          user.correo,

        usuario:
          user.usuario,

        rol:
          user.rol,

        id_tipo_usuario:
          user.id_tipo_usuario

      }

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error login"
    });

  }

};

module.exports = {
  login
};