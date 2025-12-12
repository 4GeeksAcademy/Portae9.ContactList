
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useInsertionEffect } from "react";

export const ContactList = () => {
  const { store, dispatch } = useGlobalReducer()

  const user = "portae9"

  const getContacts = async () => {
        const url = `https://playground.4geeks.com/contact/agendas/${user}`;
        const options = {
            method: 'GET'
        };
        const response = await fetch(url, options)
        if(!response.ok) {
            console.log('error', response.status, response.statusText)
            if (response.status == 404) {
                console.log('Contacto no encontrado', user);
            }
            if (response.status == 400) {
                console.log('Resolver error');
            }
            return
        }
        const data = await response.json()
        console.log(data);
        dispatch({ type: "set_contacts", payload: data.contacts});
    }

  useInsertionEffect(()=>{
    getContacts()
    console.log(getContacts());
  },[])

  return (
    {store.contacts.map(
                (contactData) =>{
                    return(
                        <div key={contactData.id}>
                            <Link to= {`/updatecontacts/${contactData.id}`}>
                                <button> Edit This Contact</button>
                            </Link>
                            {contactData.name}
                            <button onClick={()=> deleteContact(contactData.id)}>Delete Contact</button>
                        </div>
                    )
                }
            )}pi

  // {store.contacts.map((contacts)=> {
  //   return(
  //     <div key=contacts.idclassName="d-flex flex-column align-items-center">
  //       <div className="w-100" style={{ maxWidth: 550 }}>
  //         <div className="d-flex justify-content-between align-items-center mt-3 w-100">
  //           <h1 className="m-0" style={{color: "yellow"}}>Contact List:</h1>
  //           <Link to="/contact-add">
  //           <button className="btn btn-outline-success btn-sm">Add Contact</button>
  //           </Link>
  //         </div>
  //         <div className="card mb-3 mt-3 w-100">
  //           <div className="row g-0">
  //             <div className="col-md-4">
  //               <img src="https://i.pinimg.com/736x/04/11/a4/0411a4961f3724f15df8f6a52f75ce44.jpg" className="img-fluid rounded-star m-1" style={{ width: "180px", borderRadius: "100px" }}/>
  //             </div>
  //             <div className="col-md-8">
  //               <div className="card-body" style={{border: "1px solid grey", background: "black", color: "yellow"}}>
  //                 {/* <h5 className="card-title">Name:{store.contactInfo.name}</h5> */}
  //                 <p className="card-text mb-1"><strong>Email:</strong>{store.contactInfo.email}</p>
  //                 <p className="card-text mb-1"><strong>Phone:</strong>{store.contactInfo.phone}</p>
  //                 <p className="card-text mb-1"><strong>Address:</strong>{store.contactInfo.address}</p>
  //                 <div className="d-flex gap-2 mt-3">
  //                   <Link to="/contact-edit">
  //                   <button className="btn btn-outline-primary btn-sm">Edit</button>
  //                   </Link>
  //                   <button className="btn btn-outline-danger btn-sm">Delete</button>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }
  // )}
  );
};