
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Spinners } from "../components/Spinners.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
export const Starship = () => {
  const swapiHost = 'https://www.swapi.tech/api'
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();
  const [vehicles, setVehicles] = useState([])

  const handleFavorite = (item, type) => {
    dispatch({
      type: "add_favorite",
      payload: {
        name: item.name,
        type: type
      }
    });
  };

  const getVehicles = async () => {
    const naves = JSON.parse(localStorage.getItem('vehicles'))
    console.log(naves)
    if (!naves) {
      const uri = `${swapiHost}/vehicles`
      const response = await fetch(uri)
      if (!response.ok) {
        // tratamos el error
        console.log('Error:', response.status, response.statusText)
        return
      }
      let data = await response.json()
      localStorage.setItem('vehicles', JSON.stringify(data.results))
      naves = data.results
    }
    setVehicles(naves)
  }
  useEffect(() => {
    dispatch({
      type: 'vehicle_details',
      payload: {}
    })
    getVehicles()
  }, [])
  return (
    <div className="container sw-list-itemmt-3">
      <h1 className="text-center text-center sw-title">Vehicles</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2">
        {vehicles ?
          vehicles.map((item) =>
            <div className="col" key={item.uid}>
              <div className="card border-dark rounded my-3 mx-2 bg-galactic-deep">
                <img alt="" src={`https://github.com/breatheco-de/swapi-images/blob/master/public/images/vehicles/${item.uid}.jpg?raw=true`} />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <div className="d-flex justify-content-between">
                     <Link to={`/starship-details/${item.uid}`}>
                      <span className="btn btn-secondary"
                      >Details</span>
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
    </div>
  )
}