const express = require("express");

const router = express.Router();

const pool =
  require("../config/db");

/* =========================
   CREAR RESERVA
========================= */

router.post(
  "/reservations",

  async (req, res) => {

    try {

      const {
        id_usuario,
        id_hotel,
        num_hab,
        fecha_inicio,
        fecha_fin,
        extras
      } = req.body;


      /* =========================
         VALIDAR CAMPOS
      ========================= */

      if (
        !id_usuario ||
        !id_hotel ||
        !num_hab ||
        !fecha_inicio ||
        !fecha_fin
      ) {

        return res.status(400).json({
          message:
            "Todos los campos son obligatorios",
        });

      }

      /* =========================
         VALIDAR FECHAS
      ========================= */

      const fechaInicio =
        new Date(fecha_inicio);

      const fechaFin =
        new Date(fecha_fin);

      if (
        fechaFin <= fechaInicio
      ) {

        return res.status(400).json({
          message:
            "La fecha final debe ser mayor",
        });

      }

      /* =========================
         VALIDAR DISPONIBILIDAD
      ========================= */

      const ocupada =
        await pool.query(
          `
          SELECT r.id_reserva

          FROM reserva r

          INNER JOIN reserva_habitacion rh
          ON r.id_reserva =
             rh.id_reserva

          WHERE rh.id_hotel = $1
          AND rh.num_hab = $2

          AND r.estado != 'cancelada'

          AND (
            r.fecha_inicio <= $4
            AND r.fecha_fin >= $3
          )
          `,
          [
            id_hotel,
            num_hab,
            fecha_inicio,
            fecha_fin
          ]
        );

      if (
        ocupada.rows.length > 0
      ) {

        return res.status(400).json({
          message:
            "La habitación ya está reservada"
        });

      }

      /* =========================
         OBTENER PRECIO
      ========================= */

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
            "Habitación no encontrada",
        });

      }

      const precioHabitacion =
        Number(
          room.rows[0].precio
        );

      /* =========================
         CALCULAR DÍAS
      ========================= */

      const diferenciaMs =
        fechaFin - fechaInicio;

      const dias =
        Math.ceil(
          diferenciaMs /
          (1000 * 60 * 60 * 24)
        );

      /* =========================
         TOTAL EXTRAS
      ========================= */

      let totalExtras = 0;

      if (
        extras &&
        extras.length > 0
      ) {

        totalExtras =
          extras.reduce(
            (acc, extra) =>
              acc +
              Number(extra.precio),
            0
          );

      }

      /* =========================
         TOTAL FINAL
      ========================= */

      const total =
        (
          precioHabitacion *
          dias
        ) +
        totalExtras;

      /* =========================
         CREAR RESERVA
      ========================= */

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
            'confirmada',
            $4
          )

          RETURNING *
          `,
          [
            fecha_inicio,
            fecha_fin,
            total,
            id_usuario
          ]
        );

      const idReserva =
        reserva.rows[0]
          .id_reserva;

      /* =========================
        MIS RESERVAS
      ========================= */

      router.get(
        "/my-reservations/:id",

        async (req, res) => {

          try {

            const { id } =
              req.params;

            const reservas =
              await pool.query(
                `
                SELECT
                  r.id_reserva,
                  r.fecha_inicio,
                  r.fecha_fin,
                  r.total,
                  r.estado,

                  h.nombre
                  AS hotel,

                  rh.num_hab,

                  STRING_AGG(
                    e.nombre,
                    ', '
                  ) AS extras

                FROM reserva r

                INNER JOIN reserva_habitacion rh
                ON r.id_reserva =
                  rh.id_reserva

                INNER JOIN hotel h
                ON rh.id_hotel =
                  h.id_hotel

                LEFT JOIN reserva_extra re
                ON r.id_reserva =
                  re.id_reserva

                LEFT JOIN extras e
                ON re.id_extra =
                  e.id_extra

                WHERE r.id_usuario = $1

                GROUP BY
                  r.id_reserva,
                  h.nombre,
                  rh.num_hab

                ORDER BY
                  r.id_reserva DESC
                `,
                [id]
              );

            res.json(
              reservas.rows
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

      /* =========================
         RESERVA HABITACION
      ========================= */

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
          idReserva,
          id_hotel,
          num_hab
        ]
      );

      /* =========================
         GUARDAR EXTRAS
      ========================= */

      if (
        extras &&
        extras.length > 0
      ) {

        for (
          const extra
          of extras
        ) {

          await pool.query(
            `
            INSERT INTO reserva_extra
            (
              id_reserva,
              id_extra,
              cantidad
            )

            VALUES
            (
              $1,
              $2,
              $3
            )
            `,
            [
              idReserva,
              extra.id_extra,
              1
            ]
          );

        }

      }

      /* =========================
         RESPUESTA
      ========================= */

      res.status(201).json({

        message:
          "Reserva creada correctamente",

        reserva:
          reserva.rows[0]

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        message:
          "Error creando reserva",

        error:
          error.message

      });

    }

  }
);

/* =========================
   CANCELAR RESERVA
========================= */

router.delete(
  "/reservations/:id",

  async (req, res) => {

    try {

      const { id } = req.params;

      /* =========================
         VALIDAR EXISTENCIA
      ========================= */

      const reserva =
        await pool.query(
          `
          SELECT *
          FROM reserva
          WHERE id_reserva = $1
          `,
          [id]
        );

      if (
        reserva.rows.length === 0
      ) {

        return res.status(404).json({

          message:
            "Reserva no encontrada"

        });

      }

      /* =========================
         CAMBIAR ESTADO
      ========================= */

      await pool.query(
        `
        UPDATE reserva
        SET estado = 'cancelada'
        WHERE id_reserva = $1
        `,
        [id]
      );

      res.json({

        message:
          "Reserva cancelada correctamente"

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        message:
          "Error cancelando reserva"

      });

    }

  }
);

module.exports = router;