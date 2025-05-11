import anteriorIcon from "./assets/icons/anterior.svg";
import siguienteIcon from "./assets/icons/siguiente.svg";
import closeIcon from "./assets/icons/close.svg";
import viniloIcon from "./assets/icons/vinilo.svg";

function Reproductor({ canciones, setCanciones, videoActivo, setVideoActivo, incrementarReproduccion }) {
  const siguienteVideo = () => {
    const currentIndex = canciones.findIndex((c) => c.url === videoActivo);
    const nextIndex = (currentIndex + 1) % canciones.length;
    const nextUrl = canciones[nextIndex].url;
    incrementarReproduccion(nextUrl);
    setVideoActivo(nextUrl);
  };

  const anteriorVideo = () => {
    const currentIndex = canciones.findIndex((c) => c.url === videoActivo);
    const prevIndex = (currentIndex - 1 + canciones.length) % canciones.length;
    const prevUrl = canciones[prevIndex].url;
    incrementarReproduccion(prevUrl);
    setVideoActivo(prevUrl);
  };

  const cerrarVideo = () => {
    setVideoActivo(null);
  };

  const obtenerIdVideo = (url) => {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("v") || urlObj.pathname.slice(1);
  };

  return (
    <div className="reproductor-container">
      <div className="vinilo-container">
        {!videoActivo ? (
          <img src={viniloIcon} alt="Vinilo" className="vinilo-img" />
        ) : (
          <div className="video-container">
            <iframe
              src={`https://www.youtube.com/embed/${obtenerIdVideo(videoActivo)}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>

      <div className="botones-reproductor">
        <button onClick={anteriorVideo} className="icon-btn">
          <img src={anteriorIcon} alt="Anterior" />
        </button>
        <button onClick={cerrarVideo} className="icon-btn">
          <img src={closeIcon} alt="Cerrar" />
        </button>
        <button onClick={siguienteVideo} className="icon-btn">
          <img src={siguienteIcon} alt="Siguiente" />
        </button>
      </div>
    </div>
  );
}

export default Reproductor;
