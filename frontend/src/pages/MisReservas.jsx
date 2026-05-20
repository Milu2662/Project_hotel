import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import api from "../services/api";

import "../styles/MisReservas.css";

function MisReservas() {

  const [reservas, setReservas] =
    useState([]);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  useEffect(() => {

    const fetchReservas =
      async () => {

        try {

          const response =
            await api.get(
              `/reservations/user/${user.id_usuario}`
            );

          setReservas(
            response.data
          );

        } catch (error) {

          console.error(error);

        }

      };

    if (user) {

      fetchReservas();

    }

  }, [user]);

  /* =========================
     CANCELAR
  ========================= */

  const cancelReservation =
    async (id) => {

      try {

        await api.delete(
          `/reservations/${id}`
        );

        alert(
          "Reserva cancelada"
        );

        setReservas(

          reservas.map(
            (reserva) =>

              reserva.id_reserva === id

                ? {
                    ...reserva,
                    estado:
                      "cancelada",
                  }

                : reserva
          )

        );

      } catch (error) {

        console.error(error);

        alert(
          "Error cancelando reserva"
        );

      }

    };

  return (

    <div className="mis-reservas-page">

      <Navbar />

      <div className="reservas-container">

        <h1>
          Mis Reservas
        </h1>

        <div className="reservas-grid">

          {reservas.map(
            (reserva, index) => (

              <div
                key={index}
                className="reserva-card"
              >

                <h2>
                  Reserva #
                  {reserva.id_reserva}
                </h2>

                <p>

                  📅 Inicio:
                  {" "}
                  {reserva.fecha_inicio?.slice(
                    0,
                    10
                  )}

                </p>

                <p>

                  📅 Fin:
                  {" "}
                  {reserva.fecha_fin?.slice(
                    0,
                    10
                  )}

                </p>

                <p>

                  💰 Total:
                  {" "}
                  $
                  {Number(
                    reserva.total
                  ).toLocaleString()}

                </p>

                <p>

                  Estado:
                  {" "}

                  <strong>

                    {reserva.estado}

                  </strong>

                </p>

                {/* BOTÓN */}

                {reserva.estado !==
                  "cancelada" && (

                  <button
                    className="cancel-btn"
                    onClick={() =>
                      cancelReservation(
                        reserva.id_reserva
                      )
                    }
                  >

                    Cancelar reserva

                  </button>

                )}

              </div>

            )
          )}


        </div>

      </div>

    </div>

  );

}

export default MisReservas;