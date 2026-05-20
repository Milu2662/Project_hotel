const pool = require("../config/db");

const getHotels = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        h.id_hotel,
        h.nombre,
        h.direccion,
        l.nombre AS ciudad
      FROM hotel h
      JOIN lugar l
        ON h.id_lugar = l.id_lugar
      ORDER BY h.id_hotel
    `);

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getHotels,
};