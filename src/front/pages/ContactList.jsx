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
      <Link to={`/contact-add`}>
        <button className="btn btn-primary btn-sm">Add Contact</button>
      </Link>
      <div className="container">
        {store.contacts.map((contacts) => (
          <div key={contacts.id} className="card mt-3">
            <div className="card-body">
              <h5>{contacts.name}</h5>
              <p>{contacts.email}</p>
              <p>{contacts.phone}</p>
              <p>{contacts.address}</p>
              <Link to={`/contact-edit/${contacts.id}`}>
                <button className="btn btn-primary btn-sm">Edit</button>
              </Link>
              <button onClick={() => handleDelete(contacts.id)} className="btn btn-danger btn-sm">Delete Contact</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
