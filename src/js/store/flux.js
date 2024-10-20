const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      people: [],
      vehicules: [],
      planets: [],
      favorites: [],
    },
    actions: {
      getPeople: async () => {
        const store = getStore();
        const setError = (errorMessage) => setStore({ error: errorMessage });

        try {
          const responses = await Promise.all(
            Array.from({ length: 10 }, (_, i) =>
              fetch(`https://www.swapi.tech/api/people/${i + 1}`)
            )
          );

          const results = await Promise.all(
            responses.map((response) => {
              if (response.status === 200) {
                return response.json().then((data) => ({
                  ...data.result.properties,
                  uid: data.result.uid,
                  description: data.result.description,
                }));
              } else {
                return null; // Manejar errores como quieras
              }
            })
          );

          // Filtrar los resultados nulos
          const people = results.filter((person) => person !== null);
          console.log(people);
          setStore({ people });
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Error al conectar con la API.");
        }
      },

      addFavorite: (person) => {
        const store = getStore();
        if (person && person.uid && !store.favorites.find((fav) => fav.uid === person.uid)) {
          setStore({ favorites: [...store.favorites, person] });
        }
      },

      removeFavorite: async (id) => {
        const store = getStore();
        const updateFavorites = store.favorites.filter((fav) => fav.uid !== id);
        setStore({ favorites: updateFavorites });
      },
    },
  };
};

export default getState;
