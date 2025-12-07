import { useState, useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";


export const ContactAdd = () => {

    const navigate = useNavigate()
    const { store, dispatch } = useGlobalReducer()
    const [name, setName] = useState(store.contactInfo.name)
    const [phone, setPhone] = useState(store.contactInfo.phone)
    const [email, setEmail] = useState(store.contactInfo.email)
    const [address, setAddress] = useState(store.contactInfo.address)

    const getAgenda = async () => {
        const response = await fetch(`${store.host}/agendas/${store.slug}`, {
            method: "GET",
        })
        if (!response.ok) {
            console.log('error', response.status, response.statusText)
            return;
        }
        const data = await response.json()
        console.log(data);
        dispatch({
            type: "load-contacts",
            payload: data
        });
    }

    const createContactPost = async () => {
        const body = {
            "name": name,
            "phone": phone,
            "email": email,
            "address": address
        };
        const response = await fetch(`${store.host}/agendas/${store.slug}/contacts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            console.log('error', response.status, response.statusText)
            return;
        }
        const data = await response.json()
        console.log(data);
    }
    const createAgendaPost = async () => {
        const body = {
            "slug": store.slug,
            "id": ""
        };
        const response = await fetch(`${store.host}/agendas/${store.slug}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            console.log('error', response.status, response.statusText)
            return;
        }
        const data = await response.json()
        console.log(data);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await createContactPost();
        navigate("/contact-list");
    };

    useEffect(() => {
        getAgenda()
        createAgendaPost()
    }, [])


    return (
        <>
            {/* Add contact form */}
            <div className="container-fluid d-flex flex-column justify-content-center align-items-center pt-5 col-12 col-sm-6 col-md-6 col-lg-8">
                <h1 className="pb-2" style={{ color: "yellow" }}>Add Contact:</h1>
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
                    <button type="submit" className="btn btn-outline-primary">Save</button>
                </form>
            </div>
        </>

    )
}