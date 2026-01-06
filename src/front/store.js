export const initialStore = () => {
  return {
    host: "https://playground.4geeks.com/contact",
    slug: "portae9",
    contactInfo: { name: "", phone: "", email: "", address: "" },
    contacts: [],

    currentCharacter: {},
    currentPlanet: {},
    currentStarship: {},
    favorites: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_contacts":
      return {
        ...store,
        contacts: action.payload,
      };

    case "character_details":
      return { ...store, currentCharacter: action.payload };

    case "starship_details":
      return { ...store, currentStarship: action.payload };

    case "planet_details":
      return { ...store, currentPlanet: action.payload };

    case "add_favorite":
      return { ...store, favorites: [...store.favorites, action.payload] };

  case "remove_favorite":
    return {
        ...store,
        favorites: store.favorites.filter((item, index) => index !== action.payload)
    };
    default:
      console.log("Unknown action.");
      return store;
  }
}
