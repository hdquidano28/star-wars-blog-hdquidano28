import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/styles.css";

export const PlanetsDetails = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const planet = store.planets.find((pla) => pla.uid === id);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [])

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h3 className="mt-3"> Loading, please wait...</h3>
      </div>
    );
  }

  if (!planet) {
    return <div>Planet not found!</div>;
  }

  const planetImage = `https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`
  const defaultImage = "../..//img/star_wars_1.png";

  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={planetImage}
                alt={planet.name}
                className="img-fluid rounded-start"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = defaultImage;
                }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h1 className="card-title">{planet.name}</h1>
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
              <div>Name</div>
              <span>{planet.name}</span>
            </div>
            <div className="col-12 col-md-2">
              <div>Diameter</div>
              <span>{planet.diameter}</span>
            </div>
            <div className="col-12 col-md-2">
              <div>Population</div>
              <span>{planet.population}</span>
            </div>
            <div className="col-12 col-md-2">
              <div>Terrain</div>
              <span>{planet.terrain}</span>
            </div>
            <div className="col-12 col-md-2">
              <div>Gravity</div>
              <span>{planet.gravity}</span>
            </div>
            <div className="col-12 col-md-2">
              <div>Climate</div>
              <span>{planet.climate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlanetsDetails;
