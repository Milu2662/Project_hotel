const db =
  require("../config/db");

// =========================
// GET EXTRAS
// =========================

const getExtras = async (
  req,
  res
) => {

  try {

    const result =
      await db.query(`
        SELECT *
        FROM extras
        ORDER BY id_extra
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

};

module.exports = {
  getExtras
};