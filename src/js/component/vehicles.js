import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/styles.css";

export const VehiclesDetails = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  
  const vehicle = store.vehicles.find((veh) => veh.uid === id);


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

  if (!vehicle) {
    return <div>Vehicle not found!</div>;
  }

  const vehicleImage = `https://starwars-visualguide.com/assets/img/vehicles/${vehicle.uid}.jpg`
  const defaultImage = "../..//img/star_wars_1.png";

  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={vehicleImage}
                alt={vehicle.name}
                className="img-fluid rounded-start"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = defaultImage;
                }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h1 className="card-title">{vehicle.name}</h1>
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
              <span>{vehicle.name}</span>
            </div>
            <div className="col-12 col-md-2">
              <div>Model</div>
              <span>{vehicle.model}</span>
            </div>
            <div className="col-12 col-md-2">
              <div>Vehicle class</div>
              <span>{vehicle.vehicle_class}</span>
            </div>
            <div className="col-12 col-md-2">
              <div>Manufacturer</div>
              <span>{vehicle.manufacturer}</span>
            </div>
            <div className="col-12 col-md-2">
              <div>Passengers</div>
              <span>{vehicle.passengers}</span>
            </div>
            <div className="col-12 col-md-2">
              <div>Cargo capacity</div>
              <span>{vehicle.cargo_capacity}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VehiclesDetails;
