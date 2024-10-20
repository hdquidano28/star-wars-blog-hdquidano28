import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/characters.css";

export const CharactersDetail = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();

  const character = store.people.find((char) => char.uid === id);

  if (!character) {
    return <div>Character not found!</div>;
  }

  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`}
                alt={character.name}
                className="img-fluid rounded-start"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h1 className="card-title">{character.name}</h1>
                <p className="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <p className="card-text">
                  <small className="text-body-secondary">
                    Last updated 3 mins ago
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="divisor w-100"></hr>
      <div>
        <div className="properties container-fluid text-center w-100 align-items-center">
          <div className="row row-cols-auto">
            <div className="col-12 col-md-2">
              <div> Name</div>
              <span>{character.name}</span>
            </div>
            <div className="col-12 col-md-2">
              <div>Birth year</div>
              <span>{character.birth_year}</span>
            </div>
            <div className="col-12 col-md-2">
              <div>Gender</div>
              <span>{character.gender}</span>
            </div>

            <div className="col-12 col-md-2">
              <div>Height</div>
              <span>{character.height}</span>
            </div>
            <div className="col-12 col-md-2">
              <div>Skin Color</div>
              <span>{character.skin_color}</span>
            </div>
            <div className="col-12 col-md-2">
              <div>Eye Color</div>
              <span>{character.eye_color}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CharactersDetail;
