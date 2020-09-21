import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

function Playlist() {

    useEffect(() => {
        fetchHomeData()
    }, [])
    
    const [playlist,setPlaylist]= useState([])
    const [inputValue,setInputValue]= useState([])
    const [display, setDisplay] = useState([])

    const fetchHomeData = async () => { 
        const fetchData = await fetch(`/api/playlist`)
        const newItems = await fetchData.json()
        console.log(newItems)
        setPlaylist(newItems)
        setDisplay(newItems)
        }

        const searchFunc = (val) => {
            setInputValue(val)
            const searchVal = val.toLowerCase()
            const filteredItems = playlist.filter(playlist=>{
                const playListTitle = playlist.name.toLowerCase()
                return playListTitle.includes(searchVal)
            })
            setDisplay(filteredItems)
        }

    return (
        <div>
            <h1>PlayLists</h1>
            <div className='search'>
            <input value={inputValue} placeholder="Search For PlayList..." onChange={(e)=>searchFunc(e.target.value)}/>
            <span className='searchIcon'><i class="fa fa-search"></i></span>
            </div>
            <div className='flexDisplayPage'>   
            {display.map(item=> (
            <div key= {item.id} >
                <Link to= {`/playlists/${item.id}`} >
                <img src={item.cover_img} alt='My PlatList' width="100" height="100"/>
                <div>{item.name}</div>
                </Link>
            </div>
            ))}
        </div>
        </div>
    )
}

export default Playlist