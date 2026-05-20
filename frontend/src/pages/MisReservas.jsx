import {
  useEffect,
  useState
} from "react";

import Navbar
  from "../components/Navbar";

import api
  from "../services/api";

import "../styles/MisReservas.css";

function MisReservas() {

  const [reservas, setReservas] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  /* =========================
     FETCH RESERVAS
  ========================= */

  useEffect(() => {

    if (!user) return;

    const fetchReservas =
      async () => {

        try {

          console.log(
            "USER:",
            user
          );

          const response =
            await api.get(
              `/my-reservations/${user.id_usuario}`
            );

          console.log(
            "RESERVAS:",
            response.data
          );

          setReservas(
            response.data
          );

        } catch (error) {

          console.error(
            "ERROR:",
            error
          );

        } finally {

          setLoading(false);

        }

      };

    fetchReservas();

  }, []);

  /* =========================
     CANCELAR RESERVA
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

        {/* LOADING */}

        {loading ? (

          <p className="empty-message">

            Cargando reservas...

          </p>

        ) : reservas.length === 0 ? (

          /* SIN RESERVAS */

          <p className="empty-message">

            No tienes reservas.

          </p>

        ) : (

          <div className="reservas-grid">

            {reservas.map(
              (reserva) => (

                <div
                  key={
                    reserva.id_reserva
                  }
                  className="reserva-card"
                >

                  <h2>

                    Reserva #

                    {
                      reserva.id_reserva
                    }

                  </h2>

                  <p>

                    🏨 Hotel:

                    {" "}

                    <strong>

                      {
                        reserva.hotel
                      }

                    </strong>

                  </p>

                  <p>

                    🚪 Habitación:

                    {" "}

                    {
                      reserva.num_hab
                    }

                  </p>

                  <p>

                    📅 Inicio:

                    {" "}

                    {
                      reserva.fecha_inicio?.slice(
                        0,
                        10
                      )
                    }

                  </p>

                  <p>

                    📅 Fin:

                    {" "}

                    {
                      reserva.fecha_fin?.slice(
                        0,
                        10
                      )
                    }

                  </p>

                  <p>

                    🎁 Extras:

                    {" "}

                    {
                      reserva.extras ||
                      "Sin extras"
                    }

                  </p>

                  <p>

                    💰 Total:

                    {" "}

                    $

                    {
                      Number(
                        reserva.total
                      ).toLocaleString()
                    }

                  </p>

                  <p>

                    Estado:

                    {" "}

                    <strong>

                      {
                        reserva.estado
                      }

                    </strong>

                  </p>

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

        )}

      </div>

    </div>

  );

}

export default MisReservas;