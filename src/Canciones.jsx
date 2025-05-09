import { useState } from "react";

const REGEX_YOUTUBE = /^(https:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w\-]{11}$/;

function PonerCancion({ AñadirCancion, canciones }) {
  const [nombre, setNombre] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !url.trim()) {
      setError("Ambos campos son obligatorios");
      return;
    }

    if (!REGEX_YOUTUBE.test(url)) {
      setError("La URL debe ser valida de youtube");
      return;
    }

    if (canciones.some((cancion) => cancion.url === url)) {
      setError("Esta cancion ya se encuentra en la playlist");
      return;
    }

    AñadirCancion({ nombre, url, reproducciones: 0 });
    setNombre("");
    setUrl("");
    setError("");
  };

  return (
    <form onSubmit={manejarEnvio} className="formulario">
      <input
        type="text"
        placeholder="Nombre de la cancion"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL de youtube"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Añadir!</button>
    </form>
  );
}

export default PonerCancion;