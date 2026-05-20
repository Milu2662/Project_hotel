import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

import "../styles/Auth.css";

function Registro() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({

      nombre_completo: "",
      correo: "",
      usuario: "",
      password: "",
      fecha_nacimiento: "",

    });

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,

      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await api.post(
          "/auth/register",
          formData
        );

        alert(
          "Cuenta creada correctamente"
        );

        navigate("/login");

      } catch (error) {

        console.error(error);

        alert(

          error.response?.data?.message ||

          "Error registrando usuario"

        );

      }

    };

  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <h1>
          Crear cuenta
        </h1>

        <input
          type="text"
          name="nombre_completo"
          placeholder="Nombre completo"
          value={
            formData.nombre_completo
          }
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={
            formData.correo
          }
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="usuario"
          placeholder="Usuario"
          value={
            formData.usuario
          }
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="fecha_nacimiento"
          value={
            formData.fecha_nacimiento
          }
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={
            formData.password
          }
          onChange={handleChange}
          required
        />

        <button type="submit">

          Registrarse

        </button>

      </form>

    </div>

  );

}

export default Registro;