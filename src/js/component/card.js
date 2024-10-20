import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/card.css";

import PropTypes from "prop-types";

const Card = () => {
  const { store, actions } = useContext(Context);
  const characters = store.people;

  return (
    <div className="container overflow-auto">
      <div>
        <h1 className="character-color text-start">Characters</h1>
        <div className="d-flex">
          {characters.map((character, index) => {
            return (
              <div
                className="card"
                style={{ width: "20rem", margin: "15px" }}
                key={character.uid}
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
                    <Link to={`/character/${character.uid}`} className="btn btn-outline-primary">
                      Learn more!
                    </Link>
                    <button onClick={() => actions.addFavorite(character)} className="btn btn-outline-warning ml-auto">
                      <i className="bi bi-heart"></i></button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Card;
