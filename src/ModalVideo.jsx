function ModalVideo({ videoId, cerrar }) {
  if (!videoId) return null;

  return (
    <div className="modal" onClick={cerrar}>
      <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
        <lite-youtube
          videoid={videoId}
          playlabel="Reproducir video"
          style={{ width: "100%", height: "360px" }}
        ></lite-youtube>
        <button onClick={cerrar}>Cerrar</button>
      </div>
    </div>
  );
}

export default ModalVideo;
