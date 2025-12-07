
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Spinners } from "../components/Spinners.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
export const Characters = () => {
  const swapiHost = 'https://www.swapi.tech/api'
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();
  const [characters, setCharacters] = useState([])
  const handleDetails = (personaje) => {
   
    dispatch({
      type: 'character_details',
      payload: personaje
    })
 
    navigate('/character-details')
  }
  const getCharacters = async () => {
    const personajes = JSON.parse(localStorage.getItem('characters'))
    console.log(personajes)
    if (!personajes) {
      const uri = `${swapiHost}/people`
      const response = await fetch(uri)
      if (!response.ok) {
        // tratamos el error
        console.log('Error:', response.status, response.statusText)
        return
      }
      const data = await response.json()
      localStorage.setItem('characters', JSON.stringify(data.results))
      personajes = data.results
    }
    setCharacters(personajes)
  }
  useEffect(() => {
    dispatch({
      type: 'character_details',
      payload: {}
    })
    getCharacters()
  }, [])
  return (
    <div className="container mt-3">
      <h1 className="text-center">Characters</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2">
        {characters ?
          characters.map((item) =>
            <div className="col" key={item.uid}>
              <div className="card border-dark rounded my-3 mx-2 text-bg-dark">
                <img alt="" src={`https://github.com/breatheco-de/swapi-images/blob/master/public/images/people/${item.uid}.jpg?raw=true`} />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <div className="d-flex justify-content-between">
                    <span className="btn btn-secondary" onClick={() => handleDetails(item)}>Details</span>
                    <Link className="btn btn-outline-warning" to="/characters">
                      <i className="far fa-heart fa-lg"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
          :
        <h1>Cargando</h1>
          // <Spinners />
        }
      </div>
    </div>
  )
}