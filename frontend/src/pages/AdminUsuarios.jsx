import { useEffect, useState } from "react";

import api from "../services/api";

import "../styles/AdminUsuarios.css";

import AdminSidebar from "../components/AdminSidebar";

function AdminUsuarios() {

  const [usuarios, setUsuarios] =
    useState([]);

  const [nombre, setNombre] =
    useState("");

  const [correo, setCorreo] =
    useState("");

  const [usuario, setUsuario] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [fechaNacimiento,
    setFechaNacimiento] =
    useState("");

  const [rol, setRol] =
    useState("");

  // =========================
  // OBTENER USUARIOS
  // =========================

  const fetchUsuarios =
    async () => {

      try {

        const res =
          await api.get(
            "/admin/usuarios"
          );

        setUsuarios(res.data);

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

  const cargarUsuarios =
    async () => {

      try {

        const res =
          await api.get(
            "/admin/usuarios"
          );

        setUsuarios(res.data);

      } catch (error) {

        console.log(error);

      }

    };

  cargarUsuarios();

}, []);

  // =========================
  // CREAR USUARIO
  // =========================

  const crearUsuario =
    async (e) => {

      e.preventDefault();

      try {

        await api.post(
          "/admin/usuarios",
          {
            nombre_completo: nombre,
            correo,
            usuario,
            password,
            fecha_nacimiento:
              fechaNacimiento,
            id_tipo_usuario: rol
          }
        );

        setNombre("");
        setCorreo("");
        setUsuario("");
        setPassword("");
        setFechaNacimiento("");
        setRol("");

        fetchUsuarios();

      } catch (error) {

        console.log(error);

      }

    };

  // =========================
  // ELIMINAR
  // =========================

  const eliminarUsuario =
    async (id) => {

      try {

        await api.delete(
          `/admin/usuarios/${id}`
        );

        fetchUsuarios();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="admin-users-page">

      <div className="admin-layout">

        <AdminSidebar />

        <main className="admin-content">

          <h1 className="admin-title">
            Gestión Usuarios
          </h1>

          <p className="admin-subtitle">
            Administra administradores,
            recepcionistas y clientes.
          </p>

          {/* FORM */}

          <form
            className="usuario-form"
            onSubmit={crearUsuario}
          >

            <input
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) =>
                setNombre(
                  e.target.value
                )
              }
              required
            />

            <input
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) =>
                setCorreo(
                  e.target.value
                )
              }
              required
            />

            <input
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) =>
                setUsuario(
                  e.target.value
                )
              }
              required
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
            />

            <input
              type="date"
              value={fechaNacimiento}
              onChange={(e) =>
                setFechaNacimiento(
                  e.target.value
                )
              }
            />

            <select
              value={rol}
              onChange={(e) =>
                setRol(
                  e.target.value
                )
              }
              required
            >

              <option value="">
                Selecciona rol
              </option>

              <option value="1">
                Cliente
              </option>

              <option value="2">
                Administrador
              </option>

              <option value="3">
                Recepcionista
              </option>

            </select>

            <button type="submit">
              Crear usuario
            </button>

          </form>

          {/* GRID */}

          <div className="usuarios-grid">

            {usuarios.map((u) => (

              <div
                className="usuario-card"
                key={u.id_usuario}
              >

                <h2>
                  {u.nombre_completo}
                </h2>

                <p>
                  {u.correo}
                </p>

                <p>
                  Usuario: {u.usuario}
                </p>

                <span className="usuario-rol">

                  {u.rol}

                </span>

                <button
                  className="delete-btn"
                  onClick={() =>
                    eliminarUsuario(
                      u.id_usuario
                    )
                  }
                >
                  Eliminar
                </button>

              </div>

            ))}

          </div>

        </main>

      </div>

    </div>

  );

}

export default AdminUsuarios;