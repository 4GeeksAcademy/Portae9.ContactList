import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useParams } from "react-router-dom";

export const StarshipDetails = () => {

  const { store } = useGlobalReducer();
  const [starship, setStarship] = useState(null);
  const { uid } = useParams();

  useEffect(() => {
    const getStarshipDetails = async () => {
      const response = await fetch(`https://www.swapi.tech/api/vehicles/${uid}`);
      const data = await response.json();
      setStarship(data.result.properties);
    };

    getStarshipDetails();
  }, [uid]);

  if (!starship) return <p>Cargando...</p>;

  return (
    <div className="container mt-3">
      <h1 className="text-center">Detalles de la Nave</h1>

      <ul className="list-group">
        <li className="list-group-item">
          <strong>Nombre:</strong> {starship.name}
        </li>
        <li className="list-group-item">
          <strong>Modelo:</strong> {starship.model}
        </li>
        <li className="list-group-item">
          <strong>Pasajeros:</strong> {starship.passengers}
        </li>
        <li className="list-group-item">
          <strong>Capacidad de carga:</strong> {starship.cargo_capacity}
        </li>
        <li className="list-group-item">
          <strong>Velocidad máxima:</strong> {starship.max_atmosphering_speed}
        </li>
      </ul>
    </div>
  );
};
