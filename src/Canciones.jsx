import { useState } from "react";

function extraerIdDeYouTube(url) {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    if (hostname.includes("youtube.com")) {
      return parsedUrl.searchParams.get("v");
    }

    if (hostname.includes("youtu.be")) {
      return parsedUrl.pathname.split("/")[1]; 
    }

    return null;
  } catch {
    return null;
  }
}

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

    const videoId = extraerIdDeYouTube(url);

    if (!videoId || videoId.length !== 11) {
      setError("La URL debe ser válida y pertenecer a YouTube (youtube.com o youtu.be)");
      return;
    }

    if (canciones.some((cancion) => cancion.videoId === videoId)) {
      setError("Esta canción ya se encuentra en la playlist");
      return;
    }

    AñadirCancion({ nombre, url, videoId, reproducciones: 0 });
    setNombre("");
    setUrl("");
    setError("");
  };

  return (
    <form onSubmit={manejarEnvio} className="formulario">
      <input
        type="text"
        placeholder="Nombre de la canción"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL de YouTube"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <div className="contenedor-boton-error">
    <button type="submit">Añadir!</button>
    {error && <p className="mensaje-error">{error}</p>}
    </div>
    </form>
  );
}

export default PonerCancion;
