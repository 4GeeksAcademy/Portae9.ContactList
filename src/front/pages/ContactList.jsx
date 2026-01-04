import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState, useEffect } from "react"

export const ContactList = () => {

  const { store, dispatch } = useGlobalReducer();
  const user = "portae9";
 
  const handleDelete = async (id) => {
    const uri = `https://playground.4geeks.com/contact/agendas/${user}/contacts/${id}`;
    const options = {
      method: 'DELETE'
    };
    const response = await fetch(uri, options);
    if (!response.ok) {
      console.log('Error', response.status, response.statusText);
      return
    }
    console.log("Contacto ELIMINADO correctamente");
    getContacts()
  }

  const getContacts = async () => {
    const response = await fetch(
      `https://playground.4geeks.com/contact/agendas/${user}/contacts`
    );
    if (!response.ok) return;
    const data = await response.json();
    console.log(data);

    dispatch({ type: "set_contacts", payload: data.contacts });
  };

  useEffect(() => {
    getContacts();
  }, []);

 
  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <div className="w-100" style={{ maxWidth: 550 }}>
          <div className="d-flex justify-content-between align-items-center mt-5 w-100">
            <h1 className="m-0" style={{ color: "#f5c542" }}>Contact List:</h1>

            <div>
              <Link to={`/contact-add`}>
                <button className="btn btn-outline-primary btn-sm ">Add Contact</button>
              </Link>
            </div>
          </div>

          <div className="container">
            {store.contacts.map((contacts) => (
              <div key={contacts.id} className="card mt-3">
                <div className="card-body">
                  <h5>{contacts.name}</h5>
                  <p>{contacts.email}</p>
                  <p>{contacts.phone}</p>
                  <p>{contacts.address}</p>

                  <div className="d-flex gap-2 mt-3">
                    <Link to={`/contact-edit/${contacts.id}`}>
                      <button className="btn btn-outline-primary btn-sm">Edit</button>
                    </Link>

                    <button
                      onClick={() => handleDelete(contacts.id)}
                      className="btn btn-outline-danger btn-sm"
                    >
                      Delete Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};