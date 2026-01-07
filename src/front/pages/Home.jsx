import React, { useEffect, useRef, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import starWarsMusic from "../assets/starwars.mp3";

export const Home = () => {
  const { store } = useGlobalReducer();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play().catch(() => console.log("Autoplay bloqueado"));
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    }
    return () => audioRef.current?.pause();
  }, []);

  // Texto dividido en líneas más cortas al inicio, líneas finales limitadas
  const lines = [
    "Hace mucho tiempo,",
    "en una galaxia muy, muy lejana…",
    "un Imperio Galáctico se alzaba entre estrellas,",
    "y nuevas fuerzas comenzaban a despertar.",
    "Desde los confines del multiverso digital,",
    "Claudia Portanova presenta…",
    "Una aplicación utilizando las Fuerzas de React,",
    "el poder de las APIs, la gestión del estado global",
    "y arquitecturas capaces de viajar a través del tiempo y el espacio.",
  ];

  return (
    <div style={{
      minHeight: '100vh',
      overflow: 'hidden',
      fontFamily: "'Arial', sans-serif",
      color: '#feda4a',
      perspective: '1200px', // perspectiva fuerte
      position: 'relative'
    }}>
      {/* Crawl */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        transformStyle: 'preserve-3d',
        transformOrigin: 'bottom center',
        animation: 'crawl 150s linear forwards'
      }}>
        <div style={{
          width: '80%',
          maxWidth: '1200px', // límite para que las líneas inferiores no se salgan
          textAlign: 'center',
          transform: 'rotateX(55deg)', // inclinación fuerte hacia el horizonte
        }}>
          {lines.map((line, index) => (
            <p key={index} style={{
              fontSize: '4rem',
              lineHeight: '4.2rem',
              fontWeight: 'bold',
              marginBottom: '2rem',
              wordWrap: 'break-word' // para que no se exceda del ancho
            }}>
              {line}
            </p>
          ))}

          {/* Frase final */}
          <p style={{
            fontSize: '3rem',
            marginTop: '8rem',
            fontWeight: 'bold'
          }}>
            MAY THE FORCE BE WITH YOU.
          </p>
        </div>
      </div>

      {/* Botón de música discreto */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 10
      }}>
        <button 
          onClick={toggleMusic} 
          style={{
            border: '2px solid #feda4a',
            color: '#feda4a',
            background: 'transparent',
            padding: '0.4rem 0.8rem',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          {isPlaying ? "PAUSE" : "PLAY"} <span>🎵</span>
        </button>
      </div>

      <audio ref={audioRef} loop>
        <source src={starWarsMusic} type="audio/mpeg" />
      </audio>

      <style>
        {`
          @keyframes crawl {
            0% { 
              transform: translateY(100%); 
            }
            100% { 
              transform: translateY(-400%); 
            }
          }
        `}
      </style>
    </div>
  );
};
