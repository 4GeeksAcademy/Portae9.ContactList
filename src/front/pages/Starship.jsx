
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Spinners } from "../components/Spinners.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
export const Starship = () => {
  const swapiHost = 'https://www.swapi.tech/api'
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();
  const [vehicles, setVehicles] = useState([])
  const handleDetails = (nave) => {
   
    dispatch({
      type: 'vehicles_details',
      payload: nave
    })
 
    navigate('/vehicles-details')
  }
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
    <div className="container mt-3">
      <h1 className="text-center">Vehicles</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2">
        {vehicles ?
          vehicles.map((item) =>
            <div className="col" key={item.uid}>
              <div className="card border-dark rounded my-3 mx-2 text-bg-dark">
                <img alt="" src={`https://github.com/breatheco-de/swapi-images/blob/master/public/images/vehicles/${item.uid}.jpg?raw=true`} />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <div className="d-flex justify-content-between">
                    <span className="btn btn-secondary" onClick={() => handleDetails(item)}>Details</span>
                    <Link className="btn btn-outline-warning" to="/vehicles">
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