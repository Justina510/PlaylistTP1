import { useState, useEffect } from "react";
import PonerCancion from "./Canciones";
import "./index.css";
import ModalVideo from "./ModalVideo";

function App() {
  const [canciones, setCanciones] = useState([]);
  const [videoActivo, setVideoActivo] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [ordenado, setOrdenado] = useState(false);

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

  const cancionesFiltradas = canciones
    .filter((cancion) =>
      cancion.nombre.toLowerCase().includes(busqueda.toLowerCase())
    )
    .sort((a, b) => (ordenado ? b.reproducciones - a.reproducciones : 0));

  return (
    <div className="contenedor">
      <h1>Playlist ★!</h1>

      <PonerCancion AñadirCancion={AñadirCancion} canciones={canciones} />

      <input
        type="text"
        placeholder="Buscar canción"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "98%" }}
      />

      <button onClick={() => setOrdenado(!ordenado)} style={{ marginBottom: "20px" }}>
        {ordenado ? "Desordenar" : "Ordenar por reproducciones"}
      </button>

      <h2>Playlist</h2>
      <ul>
        {cancionesFiltradas.map((cancion) => (
          <li key={cancion.url}>
            {cancion.nombre} - Reproducciones: {cancion.reproducciones}
            <button
              onClick={() => {
                const indexReal = canciones.findIndex((c) => c.url === cancion.url);
                const nuevas = [...canciones];
                nuevas[indexReal].reproducciones += 1;
                setCanciones(nuevas);

                const url = new URL(cancion.url);
                const id = url.searchParams.get("v") || url.pathname.slice(1);
                setVideoActivo(id);
              }}
            >
              ▶️ Play
            </button>
          </li>
        ))}
      </ul>

      <ModalVideo videoId={videoActivo} cerrar={() => setVideoActivo(null)} />
    </div>
  );
}

export default App;