import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";
import "../styles/Auth.css";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({

      nombre_completo: "",
      correo: "",
      usuario: "",
      password: "",
      fecha_nacimiento: "",

    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSubmit = async (e) => {

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
        error.response.data.message
      );

    }

  };

  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <h1>Crear cuenta</h1>

        <input
          type="text"
          name="nombre_completo"
          placeholder="Nombre completo"
          onChange={handleChange}
        />

        <input
          type="email"
          name="correo"
          placeholder="Correo"
          onChange={handleChange}
        />

        <input
          type="text"
          name="usuario"
          placeholder="Usuario"
          onChange={handleChange}
        />

        <input
          type="date"
          name="fecha_nacimiento"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
        />

        <button type="submit">
          Registrarse
        </button>

      </form>

    </div>

  );

}

export default Register;