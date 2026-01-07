import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useParams } from "react-router-dom";

export const PlanetsDetails = () => {

  const { store } = useGlobalReducer();
  const [planets, setPlanets] = useState({});
  const { uid } = useParams();

  useEffect(() => {
    const getPlanetsDetails = async () => {
      const response = await fetch(`https://www.swapi.tech/api/planets/${uid}`);
      const data = await response.json();
      setPlanets(data.result.properties);
    };

    getPlanetsDetails();
  }, [uid]);

  return (
    <div className="container mt-3">
    <h1 className="text-center sw-text-galactic">Detalles del Planeta</h1>
    <h2 className="sw-text-galactic-soft">{planets.name}</h2>
 <img className="img_planets" src={`https://github.com/breatheco-de/swapi-images/blob/master/public/images/planets/${uid}.jpg?raw=true`} />
      <ul className="list-group">
        <li className="list-group-item sw-list-item">
          Clima: {planets.climate}
        </li>
        <li className="list-group-item sw-list-item">
          Diámetro: {planets.diameter}
        </li>
        <li className="list-group-item sw-list-item">
          Periodo de rotación: {planets.rotation_period}
        </li>
        <li className="list-group-item sw-list-item">
          Población: {planets.population}
        </li>
      </ul>
    </div>
  );
};
