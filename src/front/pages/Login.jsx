
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Login = () => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate()
  
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ]  = useState('');
  const [ iAgree, setIAgree ] = useState(false);

  const handleEmail = (event) => {setEmail(event.target.value)}
  const handlePassword = (event) => {setPassword(event.target.value)}
  const handleIAgree = (event) => {setIAgree(event.target.checked)}

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataToSend = {email, password, iAgree};

    console.log(dataToSend)
    const response = {ok: true}
    if (!response.ok) {
      handleReset()
      return
    }
    
    dispatch({
      type: 'handle_alert',
      payload: {
        text: 'Bienvenido',
        color: 'info',
        display: true
      }
    })

  
    navigate('/jumbotron')
  }

  const handleReset = () => {
    setEmail('');
    setPassword('')
    setIAgree(false)
   
    dispatch({
      type: 'handle_alert',
      payload: {
        text: 'email o contraseña errónea',
        color: 'danger',
        display: true
      }
    })
  }


 
  return (
    <div className="container text-start">
      <h1 className="text-center">Login</h1>
      <div className="col-10 col-sm-8 col-md-6 col-lg-4 m-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                value={email} onChange={handleEmail}/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1"
                value={password} onChange={handlePassword}/>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"
              checked={iAgree} onChange={handleIAgree}/>
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <div>
            <button type="submit" className="btn btn-primary me-2">Submit</button>
            <button onClick={handleReset} type="reset" className="btn btn-secondary">Reset</button>
          </div>
        </form>
      </div>
    </div>
  )
}