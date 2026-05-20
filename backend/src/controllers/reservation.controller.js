const pool = require("../config/db");

const createReservation = async (req, res) => {

  try {

    const {
      id_usuario,
      num_hab,
      fecha_entrada,
      fecha_salida,
    } = req.body;

    // CREAR RESERVA

    const reservation = await pool.query(
      `
      INSERT INTO reserva
      (
        id_usuario,
        fecha_entrada,
        fecha_salida,
        estado
      )
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [
        id_usuario,
        fecha_entrada,
        fecha_salida,
        "ACTIVA"
      ]
    );

    // RELACIONAR HABITACION

    await pool.query(
      `
      INSERT INTO reserva_habitacion
      (
        id_reserva,
        num_hab
      )
      VALUES ($1,$2)
      `,
      [
        reservation.rows[0].id_reserva,
        num_hab
      ]
    );

    // OCUPAR HABITACION

    await pool.query(
      `
      UPDATE habitacion
      SET estado='OCUPADA'
      WHERE num_hab=$1
      `,
      [num_hab]
    );

    res.json({
      message:"Reserva creada",
      reserva:reservation.rows[0]
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:error.message
    });

  }

};

module.exports = {
  createReservation,
};