/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

import api from "../services/api";

import "../styles/AdminHoteles.css";

import AdminSidebar from "../components/AdminSidebar";

function AdminHoteles() {

  const [hoteles, setHoteles] =
    useState([]);

  const [lugares, setLugares] =
    useState([]);

  const [nombre, setNombre] =
    useState("");

  const [direccion, setDireccion] =
    useState("");

  const [idLugar, setIdLugar] =
    useState("");

  const fetchHoteles =
    async () => {

      try {

        const response =
          await api.get(
            "/admin/hoteles"
          );

        setHoteles(
          response.data
        );

      } catch (error) {

        console.error(error);

      }

    };

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

        console.error(error);

      }

    };

  useEffect(() => {

    fetchHoteles();

    fetchLugares();

  }, []);

  const createHotel =
    async (e) => {

      e.preventDefault();

      try {

        await api.post(
          "/admin/hoteles",
          {
            nombre,
            direccion,
            id_lugar:
              Number(idLugar),
          }
        );

        alert(
          "Hotel creado"
        );

        setNombre("");

        setDireccion("");

        setIdLugar("");

        fetchHoteles();

      } catch (error) {

        console.error(error);

      }

    };

  const deleteHotel =
    async (id) => {

      try {

        await api.delete(
          `/admin/hoteles/${id}`
        );

        fetchHoteles();

      } catch (error) {

        console.error(error);

      }

    };

  return (

    <div className="admin-hoteles-page">

      <div className="admin-layout">

        <AdminSidebar />

        <main className="admin-content">

          <div className="admin-topbar">

            <h1>
              Gestión Hoteles
            </h1>

            <p>
              Administra hoteles
              y ciudades.
            </p>

          </div>

          <form
            onSubmit={createHotel}
            className="hotel-form"
          >

            <input
              type="text"
              placeholder="Nombre hotel"
              value={nombre}
              onChange={(e) =>
                setNombre(
                  e.target.value
                )
              }
            />

            <input
              type="text"
              placeholder="Dirección"
              value={direccion}
              onChange={(e) =>
                setDireccion(
                  e.target.value
                )
              }
            />

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

                    {lugar.nombre}

                  </option>

                )
              )}

            </select>

            <button type="submit">

              Crear hotel

            </button>

          </form>

          <div className="hoteles-grid">

            {hoteles.map(
              (hotel) => (

                <div
                  key={
                    hotel.id_hotel
                  }
                  className="hotel-card"
                >

                  <div>

                    <h2>
                      {hotel.nombre}
                    </h2>

                    <p className="hotel-city">

                      📍 {hotel.lugar}

                    </p>

                    <p className="hotel-address">

                      {hotel.direccion}

                    </p>

                  </div>

                  <button
                    onClick={() =>
                      deleteHotel(
                        hotel.id_hotel
                      )
                    }
                    className="delete-btn"
                  >

                    Eliminar

                  </button>

                </div>

              )
            )}

          </div>

        </main>

      </div>

    </div>

  );

}

export default AdminHoteles;