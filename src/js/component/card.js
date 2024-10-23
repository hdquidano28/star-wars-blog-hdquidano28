import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/card.css";
import PropTypes from "prop-types";
import starWarsImageNoExist from "../../img/star_wars_1.png";

const Card = () => {
  const { store, actions } = useContext(Context);
  const characters = store.people;
  const planets = store.planets;
  const vehicles = store.vehicles;
  const [loading, setLoading] = useState(true);

  const isFavorite = (item) => {
    return store.favorites.some(
      (fav) => fav.type === item.type && fav.uid === item.uid
    );
  };
  /**
   * Adds or removes an item from the store's favorites, depending on whether
   * it is already a favorite. If it is, it is removed. If not, it is added.
   * @param {Object} item Object with structure {name, type, uid}
   */
  const handleFavorite = (item) => {
    if (isFavorite(item)) {
      actions.removeFavorite(item.uid, item.type);
    } else {
      actions.addFavorite(item);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h3 className="mt-3"> Loading, please wait...</h3>
      </div>
    );
  }

  return (
    <div>
      <div className="container overflow-auto">
        <div>
          <h1 className="character-color text-start">Characters</h1>
          <div className="d-flex">
            {characters.map((character, index) => {
              return (
                <div
                  className="card"
                  style={{ width: "20rem", margin: "15px" }}
                  key={`character-${index}`}
                >
                  <img
                    src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-start">{character.name}</h5>
                    <p className="card-text text-start">
                      Gender: {character.gender}
                    </p>
                    <p className="card-text text-start">
                      Hair Color: {character.hair_color}
                    </p>
                    <p className="card-text text-start">
                      Eye Color: {character.eye_color}
                    </p>
                    <div className="card-buttons d-flex justify-content-between">
                      <Link
                        to={`/character/${character.uid}`}
                        className="btn btn-outline-primary"
                      >
                        Learn more!
                      </Link>
                      <button
                        onClick={() =>
                          handleFavorite({ ...character, type: "character" })
                        }
                        className={`btn ms-auto ${
                          isFavorite({ ...character, type: "character" })
                            ? "btn-warning"
                            : "btn-outline-warning"
                        }`}
                      >
                        <i
                          className={`bi ${
                            isFavorite({ ...character, type: "character" })
                              ? "bi-heart-fill"
                              : "bi-heart"
                          }`}
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container overflow-auto">
        <div>
          <h1 className="character-color text-start">Planets</h1>
          <div className="d-flex">
            {planets.map((planet) => {
              return (
                <div
                  className="card"
                  style={{ width: "20rem", margin: "15px" }}
                  key={`planet-${planet.uid}`}
                >
                  <img
                    src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
                    onError={(e) => (e.target.src = starWarsImageNoExist)}
                    alt={planet.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-start">{planet.name}</h5>
                    <p className="card-text text-start">Gender:</p>
                    <p className="card-text text-start">Hair Color:</p>
                    <p className="card-text text-start">Eye Color:</p>
                    <div className="card-buttons d-flex justify-content-between">
                      <Link
                        to={`/planet/${planet.uid}`}
                        className="btn btn-outline-primary"
                      >
                        Learn more!
                      </Link>
                      <button
                        onClick={() =>
                          handleFavorite({ ...planet, type: "planet" })
                        }
                        className={`btn ms-auto ${
                          isFavorite({ ...planet, type: "planet" })
                            ? "btn-warning"
                            : "btn-outline-warning"
                        } btn-sm`}
                      >
                        <i
                          className={`bi ${
                            isFavorite({ ...planet, type: "planet" })
                              ? "bi-heart-fill"
                              : "bi-heart"
                          }`}
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container overflow-auto">
        <div>
          <h1 className="character-color text-start">Vehicles</h1>
          <div className="d-flex">
            {vehicles.map((vehicle) => {
              return (
                <div
                  className="card"
                  style={{ width: "20rem", margin: "15px" }}
                  key={`vehicle-${vehicle.uid}`}
                >
                  <img
                    src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.uid}.jpg`}
                    onError={(e) => (e.target.src = starWarsImageNoExist)}
                    alt={vehicle.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-start">{vehicle.name}</h5>
                    <p className="card-text text-start">Gender:</p>
                    <p className="card-text text-start">Hair Color:</p>
                    <p className="card-text text-start">Eye Color:</p>
                    <div className="card-buttons d-flex justify-content-between">
                      <Link
                        to={`/vehicle/${vehicle.uid}`}
                        className="btn btn-outline-primary"
                      >
                        Learn more!
                      </Link>
                      <button
                        onClick={() =>
                          handleFavorite({ ...vehicle, type: "vehicle" })
                        }
                        className={`btn ms-auto ${
                          isFavorite({ ...vehicle, type: "vehicle" })
                            ? "btn-warning"
                            : "btn-outline-warning"
                        } btn-sm`}
                      >
                        <i
                          className={`bi ${
                            isFavorite({ ...vehicle, type: "vehicle" })
                              ? "bi-heart-fill"
                              : "bi-heart"
                          }`}
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
