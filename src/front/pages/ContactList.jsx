import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";

export const ContactList = () => {

  const { store, dispatch } = useGlobalReducer();
  const user = "portae9";

  const handleDelete = async (id) => {
    const uri = `https://playground.4geeks.com/contact/agendas/${user}/contacts/${id}`;
    const options = {
      method: "DELETE"
    };

    const response = await fetch(uri, options);
    if (!response.ok) {
      console.log("Error", response.status, response.statusText);
      return;
    }

    console.log("Contacto ELIMINADO correctamente");
    getContacts();
  };

  const getContacts = async () => {
    const response = await fetch(
      `https://playground.4geeks.com/contact/agendas/${user}/contacts`
    );
    if (!response.ok) return;

    const data = await response.json();
    dispatch({ type: "set_contacts", payload: data.contacts });
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="w-100" style={{ maxWidth: 550 }}>
          <div className="text-center mt-3">
            <h1 className="text-center sw-title" style={{ color: "#f5c542" }}>
              Contact List:
            </h1>

            <div>
              <Link to={`/contact-add`}>
              <button className="btn btn-outline-warning btn-sm my-3">
                  Add Contact
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex flex-column align-items-center w-75 mx-auto">
        {store.contacts.map((contacts) => (
          <div key={contacts.id} className="card border-dark rounded my-3 mx-2 bg-galactic-deep">
            <div className="card-body">

              <div className="row">


                <div className="col-8 text-danger">
                  <h5 className="mb-1 fs-5 fw-bold">{contacts.name}</h5>
                  <p className="mb-1 fs-6">{contacts.email}</p>
                  <p className="mb-1 fs-6">{contacts.phone}</p>
                  <p className="mb-1 fs-6">{contacts.address}</p>
                </div>
                <div className="col-4 d-flex justify-content-center align-items-center">
                  <img
                    src="https://i.pinimg.com/736x/e0/4e/2a/e04e2ae6071f6a40201e6906b40b9d75.jpg"
                    alt=""
                    className="w-50 img-fluid"
                  />
                </div>
              </div>
              <div className="d-flex gap-2 mt-2">
                <Link to={`/contact-edit/${contacts.id}`}>
                  <button className="btn btn-outline-primary btn-sm">
                    Edit
                  </button>
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

    </>
  );
};
