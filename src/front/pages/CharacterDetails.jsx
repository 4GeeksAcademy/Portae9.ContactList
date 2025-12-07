import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer"
export const CharacterDetails = () => {
  const { store } = useGlobalReducer();
  const [ personajeDetails, setPersonajeDetails ] = useState({})
  const getCharacterDetails = async () => {
    const response = await fetch(store.currentCharacter.url)
    if (!response.ok){
      // trato el error
      console.log('Error', response.status, response.statusText)
      return
    }
    const data = await response.json()
    console.log(data.result.properties)
    setPersonajeDetails(data.result.properties)
  }
  useEffect(() => {
    getCharacterDetails()
  }, [])
  return (
    <div className="container mt-3">
      <h1 className="text-center">Detalles del Personaje</h1>
      <p>{store.currentCharacter.name}</p>
      <ul className="list-group">
        <li className="list-group-item">Color de piel: {personajeDetails.skin_color}</li>
        <li className="list-group-item">Color de ojos: {personajeDetails.eye_color}</li>
      </ul>
    </div>
  )
}