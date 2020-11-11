import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NavBar from "./components/navbar";
import Songs from "./components/songs";
import Artists from "./components/artists";
import Albums from "./components/albums";
import Playlists from "./components/playlists";
import Home from "./components/home";
import OnePlayList from "./components/onePlayList";
import OneSong from "./components/oneSong";
import OneArtist from "./components/oneArtist";
import OneAlbum from "./components/oneAlbum";
import SignUp from "./components/signup";
import SignIn from "./components/signin";
import PasswordReset from "./components/resetPassword";
import { useCookies } from "react-cookie";
import { auth } from "./firebase";

function App() {
  const [cookies, setCookie] = useCookies(["user"]);

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      setCookie("user", userAuth, {
        path: "/",
      });
    });
  }, []);
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          {cookies.user === "null" ? (
            <>
              <Route exact path="/" component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/resetpassword" component={PasswordReset} />
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </>
          ) : (
            <>
              <Route path="/" exact component={Home} />
              <Route path="/songs" exact component={Songs} />
              <Route path="/artists" exact component={Artists} />
              <Route path="/albums" exact component={Albums} />
              <Route path="/playlists" exact component={Playlists} />
              <Route path="/songs/:id" component={OneSong} />
              <Route path="/artists/:id" component={OneArtist} />
              <Route path="/albums/:id" component={OneAlbum} />
              <Route path="/playlists/:id" component={OnePlayList} />
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </>
          )}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
