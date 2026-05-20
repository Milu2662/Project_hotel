import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import api from "../services/api";

import Navbar from "../components/Navbar";

import "../styles/Home.css";

function Home() {

  const [hoteles, setHoteles] = useState([]);

  useEffect(() => {

    const fetchHotels = async () => {

      try {

        const response = await api.get(
          "/hoteles"
        );

        setHoteles(response.data);

      } catch (error) {

        console.error(error);

      }

    };

    fetchHotels();

  }, []);

  return (

    <>

      <Navbar />

      <div className="home-container">

        <h1 className="home-title">
          Nuestros Hoteles
        </h1>

        <div className="hotels-grid">

          {hoteles.map((hotel) => (

            <div
              key={hotel.id_hotel}
              className="hotel-card"
            >

              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                alt="hotel"
                className="hotel-image"
              />

              <div className="hotel-card-content">

                <h2 className="hotel-name">
                  {hotel.nombre}
                </h2>

                <p className="hotel-info">
                  📍 {hotel.direccion}
                </p>

                <p className="hotel-info">
                  🌎 {hotel.ciudad}
                </p>

                <Link
                  to={`/hoteles/${hotel.id_hotel}`}
                >

                  <button className="hotel-card-button">
                    Ver habitaciones
                  </button>

                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </>

  );

}

export default Home;