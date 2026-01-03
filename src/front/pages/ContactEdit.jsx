import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState, useEffect } from "react"


export const ContactEdit = () => {

    const navigate = useNavigate()
    const { id } = useParams();
    const { store, dispatch } = useGlobalReducer()
    const [name, setName] = useState(store.contactInfo.name)
    const [phone, setPhone] = useState(store.contactInfo.phone)
    const [email, setEmail] = useState(store.contactInfo.email)
    const [address, setAddress] = useState(store.contactInfo.address)
    const user = "portae9"

    const handleEdit = async (id) => {
    const uri = `https://playground.4geeks.com/contact/agendas/${user}/contacts/${id}`;
    const options = {
      method: 'PUT',
      headers: {
        "Content-type": 'application/json'
      },
      body: JSON.stringify({
        "name": name,
        "phone": phone,
        "email": email,
        "address": address,
      })
    };
    const response = await fetch(uri, options);
    if (!response.ok) {
      console.log('Error', response.status, response.statusText);
      return
    }
    console.log("Contacto EDITADO correctamente");
    getContacts()
  }

    const handleSubmit = async (event) => {
        event.preventDefault();
        handleEdit(id)
        navigate("/contact-list");
    };

    
    return (
        <>
            {/* Edit contact form */}
            <div className="container-fluid d-flex flex-column justify-content-center align-items-center pt-5 col-12 col-sm-6 col-md-6 col-lg-8">
                <h1 className="pb-2" style={{ color: "yellow" }}>Edit Contact:</h1>
                <form onSubmit={handleSubmit}>
                    {/* full name input */}
                    <div className="input-group mb-3">
                        <span className="input-group-text">Full name:</span>
                        <input value={name} onChange={(event) => setName(event.target.value)} type="text" aria-label="First name" className="form-control" />
                    </div>
                    {/* email input */}
                    <div className="input-group mb-3">
                        <span className="input-group-text">Email:</span>
                        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" aria-label="Email address" className="form-control" />
                    </div>
                    {/* phone input */}
                    <div className="input-group mb-3">
                        <span className="input-group-text">Phone:</span>
                        <input value={phone} onChange={(event) => setPhone(event.target.value)} type="tel" aria-label="Phone number" className="form-control" />
                    </div>
                    {/* address input */}
                    <div className="input-group mb-3">
                        <span className="input-group-text">Address:</span>
                        <input value={address} onChange={(event) => setAddress(event.target.value)} type="text" aria-label="Street address" className="form-control" />
                    </div>
                    {/* submit button */}
                    <button onClick={()=>handleSubmit()} type="submit" className="btn btn-outline-primary">Save</button>
                </form>
            </div>
        </>

    )
}