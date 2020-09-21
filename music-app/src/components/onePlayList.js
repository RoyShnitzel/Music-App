import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom'

function OnePlaylist({match}) {

    useEffect(() => {
        fetchHomeData()
    }, [])
    
    const [playlist,setPlaylist]= useState([])

    const fetchHomeData = async () => { 
        const fetchData = await fetch(`/api/playlist/${match.params.id}`)
        const newItems = await fetchData.json()
        console.log(newItems)
        setPlaylist(newItems)
        }

    return (
        <div>
            {playlist.length>0 ? <h1>{playlist[0].name}</h1>:<div>Loading...</div>}
            <div className="flexDisplayOne">
                <div>
                {playlist.length>0 ? <div>Created At: {new Date(playlist[0].created_at).toDateString()}</div>:<div>Loading...</div>}
                {playlist.length>0 ? <img src={playlist[0].cover_img} alt='My PlatList' width="400" height="400"/>:<div>Loading...</div>}
                </div>
                <div>
                <h4>Songs:</h4>
                    <ul>
                    {playlist.map((item)=> (
                        <li className='songsList' key={item.songsId}>
                            <span>{item.track_number}.</span>
                            <img src={`https://img.youtube.com/vi/${item.youtube_link.slice(30)}/hqdefault.jpg`} alt='Views' width="40" height="40"/>
                            <Link to={`/songs/${item.songsId}?playlist=${match.params.id}`}>{item.title}</Link>
                            <span>{item.time.slice(3)}</span>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default OnePlaylist