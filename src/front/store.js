export const initialStore=()=>{

  return{
    contactInfo: {"name": "",
            "phone": "",
            "email": "",
            "address": ""
          },
    contacts: [],

  }
}

export default function storeReducer(store, action = {}) {

  switch (action.type) {

    case 'set-contacts':
      return {
        ...store,
        contacts: action.payload
      };

    default:
      console.log('Unknown action.');
      return store;  
  }
}