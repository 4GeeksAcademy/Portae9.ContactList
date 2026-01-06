
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// import { Spinners } from "../components/Spinners.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
export const Characters = () => {
  const swapiHost = 'https://www.swapi.tech/api'
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();
  const { uid } = useParams();
  const [characters, setCharacters] = useState([])

  // const handleDetails = async (personaje) => {
  //       const uri = personaje.url;
  
  //       const response = await fetch(uri);
  //       const data = await response.json();

  //     dispatch({
  //         type: 'character_details',
  //         payload: {
  //             ...data.result.properties,
  //             uid: personaje.uid
  //         }
  //     });
  // };

  const handleFavorite = (item, type) => {
    dispatch({
      type: "add_favorite",
      payload: {
        name: item.name,
        type: type
      }
    });
  };

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

    getCharacters()
  }, [])



  return (
    <div className="container mt-3">
     <h1 className="text-center sw-title">Characters</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2">
        {characters ? characters.map((item) =>
          <div className="col" key={item.uid}>
            <div className="card border-dark rounded my-3 mx-2 bg-galactic-deep">
              <img alt="" src={`https://github.com/breatheco-de/swapi-images/blob/master/public/images/people/${item.uid}.jpg?raw=true`} />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <div className="d-flex justify-content-between">
                  <Link
                    className="btn btn-outline-warning btn-sm"
                    to={`/character-details/${item.uid}`}
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => handleFavorite(item)}
                    type="button"
                    className="btn btn-outline-light bg-transparent shadow-none"
                  >
                    <i className="far fa-heart fa-lg text-warning"></i>
                  </button>
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
    </div >
  )
}