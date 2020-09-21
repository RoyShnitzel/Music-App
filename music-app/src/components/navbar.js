import React from 'react';
import {NavLink} from 'react-router-dom';

function NavBar() {
    const styles = {
        color: 'white'
    };


    return (
        <div className='navbar'>
            <NavLink className='navbarlink' activeClassName={'activenavbarlink'} exact to='/' style={styles}>
            <div >
                Home Page
            </div>
            </NavLink>
            <NavLink className='navbarlink' activeClassName={'activenavbarlink'} exact to='/songs' style={styles}>
            <div >
                Songs Page
            </div>
            </NavLink>
            <NavLink className='navbarlink' activeClassName={'activenavbarlink'} exact to='/artists' style={styles}>
            <div >
                Artists Page
            </div>
            </NavLink>
            <NavLink className='navbarlink' activeClassName={'activenavbarlink'} exact to='/albums' style={styles}>
            <div >
                Albums Page
            </div>
            </NavLink>
            <NavLink className='navbarlink' activeClassName={'activenavbarlink'} to='/playlists' style={styles}>
            <div >
                Playlists Page
            </div>
            </NavLink>
        </div>
    )
}

export default NavBar
