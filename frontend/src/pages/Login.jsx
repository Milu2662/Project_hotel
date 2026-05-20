import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

import "../styles/Auth.css";

function Login() {

  const navigate = useNavigate();

  const [correo, setCorreo] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await api.post(
            "/auth/login",
            {
              correo,
              password,
            }
          );

        localStorage.setItem(
          "token",
          response.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            response.data.user
          )
        );

        alert("Login exitoso");

        // SI ES ADMIN

        if (
          response.data.user
            .id_tipo_usuario === 2
        ) {

          navigate("/admin");

        } else {

          navigate("/");

        }

      } catch (error) {

        console.error(error);

        alert(
          error.response?.data?.message ||
          "Error login"
        );

      }

    };

  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <h1>Login</h1>

        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) =>
            setCorreo(
              e.target.value
            )
          }
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
        />

        <button type="submit">
          Ingresar
          
        </button>

      </form>

    </div>

  );

}

export default Login;