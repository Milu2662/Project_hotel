import { useEffect, useState } from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import Navbar from "../components/Navbar";

import api from "../services/api";

import "../styles/HotelDetalle.css";

function HotelDetalle() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [hotel, setHotel] =
    useState(null);

  const [rooms, setRooms] =
    useState([]);

  const [extras, setExtras] =
    useState([]);

  const [showRooms, setShowRooms] =
    useState(false);

  const [checkIn, setCheckIn] =
    useState("");

  const [checkOut, setCheckOut] =
    useState("");

  const [guests, setGuests] =
    useState(1);

  const [loadingReservation, setLoadingReservation] =
    useState(false);

  const [selectedExtras, setSelectedExtras] =
    useState([]);

  // =========================
  // OBTENER HOTEL + EXTRAS
  // =========================

  useEffect(() => {

    const fetchHotel = async () => {

      try {

        const response =
          await api.get(
            `/hoteles/${id}`
          );

        setHotel(
          response.data
        );

      } catch (error) {

        console.error(error);

      }

    };

    const fetchExtras = async () => {

      try {

        const response =
          await api.get(
            "/extras"
          );

        setExtras(
          response.data
        );

      } catch (error) {

        console.error(error);

      }

    };

    fetchHotel();

    fetchExtras();

  }, [id]);

  // =========================
  // BUSCAR HABITACIONES
  // =========================

  const searchRooms = async () => {

    try {

      if (!checkIn || !checkOut) {

        alert(
          "Debes seleccionar fechas"
        );

        return;

      }

      const response =
        await api.get(
          `/rooms/hotel/${id}`
        );

      const filteredRooms =
        response.data.filter(
          (room) =>
            room.cant_pers >= guests
        );

      setRooms(filteredRooms);

      setShowRooms(true);

    } catch (error) {

      console.error(error);

    }

  };

  // =========================
  // SELECCIONAR EXTRAS
  // =========================

  const toggleExtra = (
    extra
  ) => {

    const exists =
      selectedExtras.find(
        (e) =>
          e.id_extra === extra.id_extra
      );

    if (exists) {

      setSelectedExtras(

        selectedExtras.filter(
          (e) =>
            e.id_extra !== extra.id_extra
        )

      );

    } else {

      setSelectedExtras([
        ...selectedExtras,
        extra
      ]);

    }

  };

  // =========================
  // CALCULAR TOTAL
  // =========================

  const calculateTotal = (
    roomPrice
  ) => {

    const extrasTotal =
      selectedExtras.reduce(
        (acc, item) =>
          acc + Number(item.precio),
        0
      );

    return (
      Number(roomPrice) +
      extrasTotal
    );

  };

// =========================
// RESERVAR
// =========================

const user =
  JSON.parse(
    localStorage.getItem("user")
  );

const createReservation = async (
  room
) => {

  try {

    // =========================
    // VALIDAR LOGIN
    // =========================

    if (!user) {

      alert(
        "Debes iniciar sesión paraN reservar"
      );

      navigate("/login");

      return;

    }

    setLoadingReservation(
      true
    );

    await api.post(
      "/reservations",
      {
        id_usuario:
          user.id_usuario,

        id_hotel: id,

        num_hab:
          room.num_hab,

        fecha_inicio:
          checkIn,

        fecha_fin:
          checkOut,

        extras:
          selectedExtras
      }
    );

    alert(
      "✅ Reserva realizada correctamente"
    );

  } catch (error) {

    console.error(error);

    alert(
      error.response?.data?.message ||
      "Error al reservar"
    );

  } finally {

    setLoadingReservation(
      false
    );

  }

};
  // =========================
  // LOADING
  // =========================

  if (!hotel) {

    return (

      <h1 className="loading-text">
        Cargando...
      </h1>

    );

  }

  return (

    <div className="hotel-detail">

      <Navbar />

      {/* HERO */}

      <section className="hotel-hero">

        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
          alt="hotel"
        />

        <div className="hero-overlay">

          <div className="hero-content">

            <h1>
              {hotel.nombre}
            </h1>

            <p>
              🌎 {hotel.ciudad}
            </p>

          </div>

        </div>

      </section>

      {/* INFO */}

      <section className="hotel-info-section">

        <div className="hotel-description">

          <h2>
            Información del hotel
          </h2>

          <p>

            Disfruta una experiencia premium
            con habitaciones modernas,
            excelente ubicación y servicios
            exclusivos.

          </p>

          <div className="hotel-location">

            <p>
              📍 {hotel.direccion}
            </p>

            <p>
              🌎 {hotel.ciudad}
            </p>

          </div>

        </div>

        {/* CARD RESERVA */}

        <div className="booking-card">

          <h3>
            Reservar habitación
          </h3>

          <label>
            Check In
          </label>

          <input
            type="date"
            value={checkIn}
            onChange={(e) =>
              setCheckIn(
                e.target.value
              )
            }
          />

          <label>
            Check Out
          </label>

          <input
            type="date"
            value={checkOut}
            onChange={(e) =>
              setCheckOut(
                e.target.value
              )
            }
          />

          <label>
            Huéspedes
          </label>

          <select
            value={guests}
            onChange={(e) =>
              setGuests(
                Number(e.target.value)
              )
            }
          >

            <option value="1">
              1 huésped
            </option>

            <option value="2">
              2 huéspedes
            </option>

            <option value="3">
              3 huéspedes
            </option>

            <option value="4">
              4 huéspedes
            </option>

          </select>

          <button
            className="booking-button"
            onClick={searchRooms}
          >

            Buscar habitaciones

          </button>

        </div>

      </section>

      {/* HABITACIONES */}

      {showRooms && (

        <section className="rooms-section">

          <h2>
            Habitaciones disponibles
          </h2>

          <div className="rooms-grid">

            {rooms.map((room, index) => (

              <div
                key={index}
                className="room-card"
              >

                <img
                  src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop"
                  alt="room"
                  className="room-image"
                />

                <div className="room-content">

                  <h3>
                    {room.nombre}
                  </h3>

                  <p>
                    👥 {room.cant_pers} personas
                  </p>

                  <p>
                    🚪 Habitación #{room.num_hab}
                  </p>

                  <div className="room-price">

                    ${Number(
                      room.precio
                    ).toLocaleString()}

                  </div>

                  {/* EXTRAS */}

                  <div className="extras-section">

                    <h4>
                      Extras disponibles
                    </h4>

                    {extras.map(
                      (extra) => (

                        <label
                          key={extra.id_extra}
                          className="extra-item"
                        >

                          <div className="extra-left">

                            <input
                              type="checkbox"
                              onChange={() =>
                                toggleExtra(
                                  extra
                                )
                              }
                            />

                            <span className="extra-name">

                              {extra.nombre}

                            </span>

                          </div>

                          <span className="extra-price">

                            +${Number(
                              extra.precio
                            ).toLocaleString()}

                          </span>

                        </label>

                      )
                    )}

                  </div>

                  {/* TOTAL */}

                  <div className="total-price">

                    <span>
                      Total a pagar
                    </span>

                    <h2>

                      ${calculateTotal(
                        room.precio
                      ).toLocaleString()}

                    </h2>

                  </div>

                  {/* BOTÓN */}

                  <button
                    className="room-button"
                    onClick={() =>
                      createReservation(
                        room
                      )
                    }
                    disabled={
                      loadingReservation
                    }
                  >

                    {loadingReservation
                      ? "Procesando..."
                      : "Reservar ahora"}

                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>

      )}

    </div>

  );

}

export default HotelDetalle;