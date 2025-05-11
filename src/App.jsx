import { useState, useEffect } from "react";
import PonerCancion from "./Canciones";
import "./index.css";
import Reproductor from "./reproductor";
import ordenadoIcon from "./assets/icons/desordenado.svg";
import desordenadoIcon from "./assets/icons/ordenado.svg";
import lupaIcon from "./assets/icons/lupa.svg";
import playIcon from "./assets/icons/play.svg";

function App() {
  const [canciones, setCanciones] = useState([]);
  const [videoActivo, setVideoActivo] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [ordenado, setOrdenado] = useState(false);
  const [mostrarBusqueda, setMostrarBusqueda] = useState(false);

  useEffect(() => {
    const guardadas = localStorage.getItem("canciones");
    if (guardadas) {
      setCanciones(JSON.parse(guardadas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("canciones", JSON.stringify(canciones));
  }, [canciones]);

  const AñadirCancion = (nuevaCancion) => {
    setCanciones((prevCanciones) => [...prevCanciones, nuevaCancion]);
  };

  const incrementarReproduccion = (url) => {
    const nuevasCanciones = canciones.map((c) => {
      if (c.url === url) {
        return {
          ...c,
          reproducciones: (c.reproducciones || 0) + 1,
        };
      }
      return c;
    });
    setCanciones(nuevasCanciones);
    localStorage.setItem("canciones", JSON.stringify(nuevasCanciones));
  };

  const cancionesFiltradas = canciones
    .filter((cancion) =>
      cancion.nombre.toLowerCase().includes(busqueda.toLowerCase())
    )
    .sort((a, b) => (ordenado ? b.reproducciones - a.reproducciones : 0));

  const manejarClickEnCancion = (url) => {
    incrementarReproduccion(url);
    setVideoActivo(url);
  };

  return (
    <div className="contenedor-principal">
      <div className="top-section">
        <h1 className="titulo">Playlist ★!</h1>
        <div className="form-section">
          <PonerCancion AñadirCancion={AñadirCancion} canciones={canciones} />
        </div>
      </div>

      <div className="main-section">
        <Reproductor
          canciones={canciones}
          setCanciones={setCanciones}
          videoActivo={videoActivo}
          setVideoActivo={setVideoActivo}
          incrementarReproduccion={incrementarReproduccion}
        />

        <div className="playlist-section">
          <div className="acciones">
            <button
              onClick={() => setOrdenado(!ordenado)}
              className="icon-button"
            >
              <img
                src={ordenado ? desordenadoIcon : ordenadoIcon}
                alt="Ordenar"
              />
            </button>
            <button
              onClick={() => setMostrarBusqueda(!mostrarBusqueda)}
              className="icon-button"
            >
              <img src={lupaIcon} alt="Buscar" />
            </button>
            <div
              className={`busqueda-desplegable ${mostrarBusqueda ? "visible slide-in" : "oculto"}`}
            >
              <input
                type="text"
                placeholder="Buscar"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="input-busqueda-inline"
              />
            </div>
          </div>

          <h2>Playlist</h2>
          <ul>
            {cancionesFiltradas.map((cancion) => (
              <li key={cancion.url} className="cancion-item">
                {cancion.nombre} - Reproducciones: {cancion.reproducciones}
                <button
                  className="boton-play"
                  onClick={() => manejarClickEnCancion(cancion.url)}
                >
                  <img src={playIcon} alt="Play" className="play-icon" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
