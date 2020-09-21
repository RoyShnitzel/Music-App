import React from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import NavBar from './components/navbar';
import Songs from './components/songs';
import Artists from './components/artists';
import Albums from './components/albums';
import Playlists from './components/playlists';
import Home from './components/home';
import OnePlayList from './components/onePlayList';
import OneSong from './components/oneSong';
import OneArtist from './components/oneArtist';
import OneAlbum from './components/oneAlbum';



function App() {
  return (
    <Router>
    <div className="App">
      <NavBar/>
      <Switch>
      <Route path='/'  exact component={Home}/>
      <Route path='/songs' exact component={Songs}/>
      <Route path='/artists' exact component={Artists}/>
      <Route path='/albums' exact component={Albums}/>
      <Route path='/playlists' exact component={Playlists}/>
      <Route path='/songs/:id' component={OneSong}/>
      <Route path='/artists/:id' component={OneArtist}/>
      <Route path='/albums/:id' component={OneAlbum}/>
      <Route path='/playlists/:id' component={OnePlayList}/>
      <Route render={()=>(
        <h1>ERROR 404 Page Not Found</h1>
      )}/>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
