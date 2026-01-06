import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useParams } from "react-router-dom";

export const CharacterDetails = () => {


  const { store , dispatch } = useGlobalReducer();
  const [ character, setCharacter] = useState({})
  const { uid } = useParams();
  
  useEffect(() => {
        const getCharacterDetails = async () => {
            const response = await fetch(`https://www.swapi.tech/api/people/${uid}`);
            const data = await response.json();
            setCharacter(data.result.properties);
        };

        getCharacterDetails();
    }, [uid]);


  return (
    <div className="container mt-3">
      <h1 className="text-center">Detalles del Personaje</h1>
      <h2 className>{character.name}</h2>
      <img className="img_character" src={`https://github.com/breatheco-de/swapi-images/blob/master/public/images/people/${uid}.jpg?raw=true`} />
      <ul className="list-group">
        <li className="list-group-item">Color de piel: {character.skin_color}</li>
        <li className="list-group-item">Color de ojos: {character.eye_color}</li>
          <li className="list-group-item">Color de cabello: {character.hair_color}</li>
         <li className="list-group-item">Altura: {character.height}</li>
         <li className="list-group-item">Sexo: {character.gender}</li>
          <li className="list-group-item">Año de nacimiento: {character.birth_year}</li>
      </ul>
    </div>
  )
}