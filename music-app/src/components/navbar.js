import React from "react";
import { NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";
import { auth } from "../firebase";

function NavBar() {
  const styles = {
    color: "white",
  };

  const [cookies, setCookie] = useCookies(["user"]);

  return (
    <div className="navbar">
      {!(cookies.user === "null") ? (
        <>
          <NavLink
            className="navbarlink"
            activeClassName={"activenavbarlink"}
            exact
            to="/"
            style={styles}
          >
            <div>Home Page</div>
          </NavLink>
          <NavLink
            className="navbarlink"
            activeClassName={"activenavbarlink"}
            exact
            to="/songs"
            style={styles}
          >
            <div>Songs Page</div>
          </NavLink>
          <NavLink
            className="navbarlink"
            activeClassName={"activenavbarlink"}
            exact
            to="/artists"
            style={styles}
          >
            <div>Artists Page</div>
          </NavLink>
          <NavLink
            className="navbarlink"
            activeClassName={"activenavbarlink"}
            exact
            to="/albums"
            style={styles}
          >
            <div>Albums Page</div>
          </NavLink>
          <NavLink
            className="navbarlink"
            activeClassName={"activenavbarlink"}
            to="/playlists"
            style={styles}
          >
            <div>Playlists Page</div>
          </NavLink>
          <NavLink
            className="navbarlink"
            activeClassName={"activenavbarlink"}
            to="/"
            style={styles}
            onClick={() => auth.signOut()}
          >
            <div>Logout</div>
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            className="navbarlink"
            activeClassName={"activenavbarlink"}
            to="/"
            style={styles}
          >
            <div>Sign In</div>
          </NavLink>
          <NavLink
            className="navbarlink"
            activeClassName={"activenavbarlink"}
            to="/signup"
            style={styles}
          >
            <div>Sign Up</div>
          </NavLink>
        </>
      )}
    </div>
  );
}

export default NavBar;
