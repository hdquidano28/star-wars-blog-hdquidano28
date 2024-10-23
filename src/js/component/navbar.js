import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import starWarsLogo from "../../img/528_star_wars.png";
import "../../styles/navbar.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  const handleRemoveFavorite = (e, uid, type) => {
    e.preventDefault();
    e.stopPropagation();
    actions.removeFavorite(uid, type);
  };

  const handleAddFavorite = (item) => {
    const result = actions.addFavorite(item);
    if (result === false) {
      setMessage("Favorite already exists");
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    } else {
      setMessage(""); // Clear message if added successfully
    }
  };

  return (
    <nav className="navbar navbar-light bg-light mb-3">
      <div className="container d-flex align-items-center justify-content-between">
        <Link to="/">
          <span className="navbar-brand">
            <img
              src={starWarsLogo}
              alt="Start Wars Logo"
              className="logo-image"
            />
          </span>
        </Link>

        <div className="ml-auto">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-primary dropdown-toggle d-flex justify-content-between align-items-center"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Favorites
              <p className="btn-secondary ms-2 rounded-3 px-2 py-1 mb-0 ">
                {store.favorites.length}
              </p>
            </button>

            <ul className="dropdown-menu">
              {store.favorites && store.favorites.length === 0 ? (
                <li className="dropdown-item">(empty)</li>
              ) : (
                store.favorites.map((favorite) => (
                  <li
                    className="dropdown-item d-flex justify-content-between"
                    key={`${favorite.uid}-${favorite.type}`}
                  >
                    {favorite.name} ({favorite.type})
                    <button
                      className="btn"
                      onClick={(e) =>
                        handleRemoveFavorite(e, favorite.uid, favorite.type)
                      }
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
