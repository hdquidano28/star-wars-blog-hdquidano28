const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      people: [],
      vehicles: [],
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

      getPlanets: async () => {
        const store = getStore();
        const setError = (errorMessage) => setStore({ error: errorMessage });

        try {
          const responses = await Promise.all(
            Array.from({ length: 10 }, (_, i) =>
              fetch(`https://www.swapi.tech/api/planets/${i + 1}`)
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
          const planets = results.filter((planet) => planet !== null);
          console.log(planets);
          setStore({ planets });
        } catch (error) {
          a;
          console.error("Error fetching data:", error);
          setError("Error al conectar con la API.");
        }
      },

      getVehicles: async () => {
        const store = getStore();
        const setError = (errorMessage) => setStore({ error: errorMessage });

        try {
          const responses = await Promise.all(
            Array.from({ length: 10 }, (_, i) =>
              fetch(`https://www.swapi.tech/api/vehicles/${i + 1}`)
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
          const vehicles = results.filter((vehicle) => vehicle !== null);
          console.log(vehicles);
          setStore({ vehicles });
        } catch (error) {
          a;
          console.error("Error fetching data:", error);
          setError("Error al conectar con la API.");
        }
      },

      addFavorite: (item) => {
        const store = getStore();
        if (item && item.uid) {
          const alreadyExists = store.favorites.some(
            (fav) => fav.uid === item.uid && fav.type === item.type
          );
          if (!alreadyExists) {
            setStore({ favorites: [...store.favorites, item] });
            return true; // Indicating the favorite was added successfully
          } else {
            return false; // Indicating the favorite already exists
          }
        }
      },

      /**
       * Remove an item from the favorites list. It receives the item's uid and type.
       * It filters the favorites list to remove the item and updates the store.
       * @param {string} uid The item's uid.
       * @param {string} type The item's type (e.g. people, planets, vehicles, etc.).
       */
      removeFavorite: (uid, type) => {
        const store = getStore();
        setStore({
          favorites: store.favorites.filter(
            (fav) => !(fav.uid === uid && fav.type === type)
          ), // Solo elimina el favorito que coincide con uid y type
        });
      },
    },
  };
};

export default getState;
