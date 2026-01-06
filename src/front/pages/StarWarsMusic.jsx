// src/components/StarWarsMusic.jsx
import { useRef, useEffect } from "react";
import starWarsTheme from "../assets/star-wars-theme.mp3"; // Pon tu mp3 aquí

export const StarWarsMusic = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // volumen ambiental suave
      audioRef.current.play().catch(() => {
        // Autoplay bloqueado hasta interacción del usuario
        console.log("Autoplay bloqueado, haz click para activar la música");
      });
    }
  }, []);

  return <audio ref={audioRef} src={starWarsTheme} loop />;
};
