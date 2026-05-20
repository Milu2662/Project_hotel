import { useEffect, useState } from "react";

import api from "../services/api";

import "../styles/AdminReservas.css";

import AdminSidebar from "../components/AdminSidebar";

/* eslint-disable react-hooks/set-state-in-effect */

function AdminReservas() {

  const [reservas, setReservas] =
    useState([]);

  const [usuarios, setUsuarios] =
    useState([]);

  const [lugares, setLugares] =
    useState([]);

  const [hoteles, setHoteles] =
    useState([]);

  const [habitaciones, setHabitaciones] =
    useState([]);

  const [extras, setExtras] =
    useState([]);

  const [
    extrasSeleccionados,
    setExtrasSeleccionados
  ] = useState([]);

  const [idLugar, setIdLugar] =
    useState("");

  const [idHotel, setIdHotel] =
    useState("");

  const [idUsuario, setIdUsuario] =
    useState("");

  const [idHabitacion, setIdHabitacion] =
    useState("");

  const [fechaInicio, setFechaInicio] =
    useState("");

  const [fechaFin, setFechaFin] =
    useState("");

  const [estado, setEstado] =
    useState("");

  const [total, setTotal] =
    useState(0);

  const [busqueda, setBusqueda] =
    useState("");

  const [orden, setOrden] =
    useState("");

  /* ======================================================
     FETCH RESERVAS
  ====================================================== */

  const fetchReservas =
    async () => {

      try {

        const response =
          await api.get(
            "/admin/reservas"
          );

        setReservas(
          response.data
        );

      } catch (error) {

        console.error(
          "ERROR RESERVAS:",
          error
        );

      }

    };

  /* ======================================================
     FETCH USUARIOS
  ====================================================== */

  const fetchUsuarios =
    async () => {

      try {

        const response =
          await api.get(
            "/admin/usuarios"
          );

        console.log(
          "USUARIOS:",
          response.data
        );

        const clientes =
          response.data.filter(
            (usuario) => {

              return (
                usuario.rol === "cliente"
              );

            }
          );

        setUsuarios(clientes);

      } catch (error) {

        console.error(
          "ERROR USUARIOS:",
          error
        );

      }

    };

  /* ======================================================
     FETCH LUGARES
  ====================================================== */

  const fetchLugares =
    async () => {

      try {

        const response =
          await api.get(
            "/admin/lugares"
          );

        setLugares(
          response.data
        );

      } catch (error) {

        console.error(
          "ERROR LUGARES:",
          error
        );

      }

    };

  /* ======================================================
     FETCH EXTRAS
  ====================================================== */

  const fetchExtras =
    async () => {

      try {

        const response =
          await api.get(
            "/admin/extras"
          );

        console.log(
          "EXTRAS:",
          response.data
        );

        setExtras(
          response.data
        );

      } catch (error) {

        console.error(
          "ERROR EXTRAS:",
          error
        );

      }

    };

  /* ======================================================
     FETCH HOTELES
  ====================================================== */

  const fetchHoteles =
    async (lugarId) => {

      try {

        const response =
          await api.get(
            `/admin/hoteles/lugar/${lugarId}`
          );

        console.log(
          "HOTELES:",
          response.data
        );

        setHoteles(
          response.data
        );

      } catch (error) {

        console.error(
          "ERROR HOTELES:",
          error
        );

      }

    };

  /* ======================================================
     FETCH HABITACIONES
  ====================================================== */

  const fetchHabitaciones =
    async (hotelId) => {

      try {

        console.log(
          "HOTEL ID:",
          hotelId
        );

        const response =
          await api.get(
            `/habitaciones/hotel/${hotelId}`
          );

        console.log(
          "HABITACIONES:",
          response.data
        );

        setHabitaciones(
          response.data
        );

      } catch (error) {

        console.error(
          "ERROR HABITACIONES:",
          error
        );

      }

    };

  /* ======================================================
     HANDLE EXTRAS
  ====================================================== */

  const handleExtraChange =
    (idExtra) => {

      if (
        extrasSeleccionados.includes(
          idExtra
        )
      ) {

        setExtrasSeleccionados(

          extrasSeleccionados.filter(
            (id) => id !== idExtra
          )

        );

      } else {

        setExtrasSeleccionados([
          ...extrasSeleccionados,
          idExtra
        ]);

      }

    };

  /* ======================================================
     CALCULAR TOTAL
  ====================================================== */

  useEffect(() => {

    let totalExtras = 0;

    extrasSeleccionados.forEach(
      (idExtra) => {

        const extra =
          extras.find(
            (e) =>
              e.id_extra === idExtra
          );

        if (extra) {

          totalExtras +=
            Number(extra.precio);

        }

      }
    );

    const habitacionSeleccionada =
      habitaciones.find(
        (hab) =>
          Number(hab.num_hab) ===
          Number(idHabitacion)
      );

    const precioHabitacion =
      habitacionSeleccionada
        ? Number(
            habitacionSeleccionada.precio
          )
        : 0;

    setTotal(
      precioHabitacion +
      totalExtras
    );

  }, [
    extrasSeleccionados,
    idHabitacion,
    habitaciones,
    extras
  ]);

  /* ======================================================
     CARGA INICIAL
  ====================================================== */

  useEffect(() => {

    const cargarDatos =
      async () => {

        await fetchReservas();

        await fetchUsuarios();

        await fetchLugares();

        await fetchExtras();

      };

    cargarDatos();

  }, []);

  /* ======================================================
     CAMBIO LUGAR
  ====================================================== */

  useEffect(() => {

    if (!idLugar) {

      setHoteles([]);

      setIdHotel("");

      return;

    }

    fetchHoteles(idLugar);

  }, [idLugar]);

  /* ======================================================
     CAMBIO HOTEL
  ====================================================== */

  useEffect(() => {

    if (!idHotel) {

      setHabitaciones([]);

      setIdHabitacion("");

      return;

    }

    fetchHabitaciones(idHotel);

  }, [idHotel]);

  /* ======================================================
     CREAR RESERVA
  ====================================================== */

  const createReserva =
    async (e) => {

      e.preventDefault();

      try {

        await api.post(
          "/admin/reservas",
          {
            id_usuario:
              Number(idUsuario),

            id_hotel:
              Number(idHotel),

            num_hab:
              Number(idHabitacion),

            fecha_inicio:
              fechaInicio,

            fecha_fin:
              fechaFin,

            estado,

            extras:
              extrasSeleccionados,
          }
        );

        alert(
          "Reserva creada correctamente"
        );

        setIdLugar("");

        setIdHotel("");

        setIdUsuario("");

        setIdHabitacion("");

        setFechaInicio("");

        setFechaFin("");

        setEstado("");

        setExtrasSeleccionados([]);

        setTotal(0);

        fetchReservas();

      } catch (error) {

        console.error(
          "ERROR CREANDO RESERVA:",
          error
        );

        alert(
          error.response?.data?.message ||
          "Error creando reserva"
        );

      }

    };

  /* ======================================================
     ELIMINAR RESERVA
  ====================================================== */

  const deleteReserva =
    async (id) => {

      const confirmar =
        window.confirm(
          "¿Eliminar reserva?"
        );

      if (!confirmar) return;

      try {

        await api.delete(
          `/admin/reservas/${id}`
        );

        fetchReservas();

      } catch (error) {

        console.error(
          "ERROR ELIMINANDO:",
          error
        );

      }

    };

  /* ======================================================
     BUSQUEDA + ORDENAMIENTO
  ====================================================== */

  const reservasFiltradas =
    [...reservas]

      .filter((reserva) =>

        reserva.nombre_completo
          .toLowerCase()
          .includes(
            busqueda.toLowerCase()
          )

      )

      .sort((a, b) => {

        if (
          orden === "cliente_asc"
        ) {

          return a.nombre_completo.localeCompare(
            b.nombre_completo
          );

        }

        if (
          orden === "cliente_desc"
        ) {

          return b.nombre_completo.localeCompare(
            a.nombre_completo
          );

        }

        if (
          orden === "fecha_asc"
        ) {

          return new Date(
            a.fecha_inicio
          ) - new Date(
            b.fecha_inicio
          );

        }

        if (
          orden === "fecha_desc"
        ) {

          return new Date(
            b.fecha_inicio
          ) - new Date(
            a.fecha_inicio
          );

        }

        if (
          orden === "total_asc"
        ) {

          return (
            Number(a.total) -
            Number(b.total)
          );

        }

        if (
          orden === "total_desc"
        ) {

          return (
            Number(b.total) -
            Number(a.total)
          );

        }

        return 0;

      });

  return (

    <div className="admin-reservas-page">

      <div className="admin-layout">

        <AdminSidebar />

        <main className="admin-content">

          <div className="admin-topbar">

            <h1>
              Gestión Reservas
            </h1>

            <p>
              Administra reservas,
              habitaciones y extras.
            </p>

          </div>

          {/* FORM */}

          <form
            onSubmit={createReserva}
            className="reserva-form"
          >

            {/* USUARIO */}

            <select
              value={idUsuario}
              onChange={(e) =>
                setIdUsuario(
                  e.target.value
                )
              }
            >

              <option value="">
                Selecciona cliente
              </option>

              {usuarios.map(
                (usuario) => (

                  <option
                    key={usuario.id_usuario}
                    value={usuario.id_usuario}
                  >

                    {usuario.nombre_completo}

                  </option>

              ))}

            </select>

            {/* LUGAR */}

            <select
              value={idLugar}
              onChange={(e) =>
                setIdLugar(
                  e.target.value
                )
              }
            >

              <option value="">
                Selecciona ciudad
              </option>

              {lugares.map(
                (lugar) => (

                  <option
                    key={
                      lugar.id_lugar
                    }
                    value={
                      lugar.id_lugar
                    }
                  >

                    {
                      lugar.nombre
                    }

                  </option>

                )
              )}

            </select>

            {/* HOTEL */}

            <select
              value={idHotel}
              onChange={(e) =>
                setIdHotel(
                  e.target.value
                )
              }
              disabled={!idLugar}
            >

              <option value="">
                Selecciona hotel
              </option>

              {hoteles.map(
                (hotel) => (

                  <option
                    key={
                      hotel.id_hotel
                    }
                    value={
                      hotel.id_hotel
                    }
                  >

                    {
                      hotel.nombre
                    }

                  </option>

                )
              )}

            </select>

            {/* HABITACION */}

            <select
              value={idHabitacion}
              onChange={(e) =>
                setIdHabitacion(
                  e.target.value
                )
              }
              disabled={!idHotel}
            >

              <option value="">
                Selecciona habitación
              </option>

              {habitaciones.map(
                (habitacion) => (

                  <option
                    key={
                      habitacion.num_hab
                    }
                    value={
                      habitacion.num_hab
                    }
                  >

                    Habitación
                    {" "}
                    {
                      habitacion.num_hab
                    }

                    {" - "}

                    {
                      habitacion.tipo_habitacion
                    }

                    {" - $"}

                    {
                      Number(
                        habitacion.precio
                      ).toLocaleString()
                    }

                  </option>

                )
              )}

            </select>

            {/* FECHAS */}

            <input
              type="date"
              value={fechaInicio}
              onChange={(e) =>
                setFechaInicio(
                  e.target.value
                )
              }
            />

            <input
              type="date"
              value={fechaFin}
              onChange={(e) =>
                setFechaFin(
                  e.target.value
                )
              }
            />

            {/* ESTADO */}

            <select
              value={estado}
              onChange={(e) =>
                setEstado(
                  e.target.value
                )
              }
            >

              <option value="">
                Estado
              </option>

              <option value="pendiente">
                Pendiente
              </option>

              <option value="confirmada">
                Confirmada
              </option>

              <option value="cancelada">
                Cancelada
              </option>

            </select>

            {/* EXTRAS */}

            <div className="extras-container">

              <h3 className="extras-title">
                Extras
              </h3>

              <div className="extras-list">

                {extras.length > 0 ? (

                  extras.map((extra) => (

                    <label
                      key={extra.id_extra}
                      className="extra-item"
                    >

                      <input
                        type="checkbox"

                        value={extra.id_extra}

                        checked={
                          extrasSeleccionados.includes(
                            extra.id_extra
                          )
                        }

                        onChange={() =>
                          handleExtraChange(
                            extra.id_extra
                          )
                        }
                      />

                      <div className="extra-info">

                        <span className="extra-name">

                          {extra.nombre}

                        </span>

                        <span className="extra-price">

                          $
                          {
                            Number(
                              extra.precio
                            ).toLocaleString()
                          }

                        </span>

                      </div>

                    </label>

                  ))

                ) : (

                  <p>
                    No hay extras disponibles
                  </p>

                )}

              </div>

            </div>

            {/* TOTAL */}

            <div className="total-container">

              <h3>
                Total:
              </h3>

              <span>

                $
                {
                  total.toLocaleString()
                }

              </span>

            </div>

            {/* BUTTON */}

            <div className="form-button-container">

              <button type="submit">

                Crear reserva

              </button>

            </div>

          </form>

          {/* BUSQUEDA + ORDEN */}

          <div className="filters-container">

            <input
              type="text"
              placeholder="Buscar cliente..."
              value={busqueda}
              onChange={(e) =>
                setBusqueda(
                  e.target.value
                )
              }
            />

            <select
              value={orden}
              onChange={(e) =>
                setOrden(
                  e.target.value
                )
              }
            >

              <option value="">
                Ordenar por
              </option>

              <option value="cliente_asc">
                Cliente A-Z
              </option>

              <option value="cliente_desc">
                Cliente Z-A
              </option>

              <option value="fecha_asc">
                Fecha más antigua
              </option>

              <option value="fecha_desc">
                Fecha más reciente
              </option>

              <option value="total_asc">
                Total menor
              </option>

              <option value="total_desc">
                Total mayor
              </option>

            </select>

          </div>

          {/* TABLA */}

          <div className="reservas-table-container">

            <table className="reservas-table">

              <thead>

                <tr>

                  <th>Cliente</th>

                  <th>Hotel</th>

                  <th>Habitación</th>

                  <th>Inicio</th>

                  <th>Fin</th>

                  <th>Estado</th>

                  <th>Total</th>

                  <th>Acciones</th>

                </tr>

              </thead>

              <tbody>

                {reservasFiltradas.map(
                  (reserva) => (

                    <tr
                      key={
                        reserva.id_reserva
                      }
                    >

                      <td>
                        {
                          reserva.nombre_completo
                        }
                      </td>

                      <td>
                        {
                          reserva.hotel
                        }
                      </td>

                      <td>
                        {
                          reserva.num_hab
                        }
                      </td>

                      <td>
                        {
                          new Date(
                            reserva.fecha_inicio
                          ).toLocaleDateString()
                        }
                      </td>

                      <td>
                        {
                          new Date(
                            reserva.fecha_fin
                          ).toLocaleDateString()
                        }
                      </td>

                      <td>
                        {
                          reserva.estado
                        }
                      </td>

                      <td>

                        $

                        {
                          Number(
                            reserva.total
                          ).toLocaleString()
                        }

                      </td>

                      <td>

                        <button
                          onClick={() =>
                            deleteReserva(
                              reserva.id_reserva
                            )
                          }
                          className="delete-btn"
                        >

                          Eliminar

                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </main>

      </div>

    </div>

  );

}

export default AdminReservas;