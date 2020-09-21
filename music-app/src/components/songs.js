import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

function Songs() {

    useEffect(() => {
        fetchHomeData()
    }, [])
    
    const [songs,setSongs]= useState([])
    const [inputValue,setInputValue]= useState([])
    const [display, setDisplay] = useState([])

    const fetchHomeData = async () => { 
        const fetchData = await fetch(`/api/songs`)
        const newItems = await fetchData.json()
        console.log(newItems)
        setSongs(newItems)
        setDisplay(newItems)
        }

        const searchFunc = (val) => {
            setInputValue(val)
            const searchVal = val.toLowerCase()
            const filteredItems = songs.filter(song=>{
                const songTitle = song.title.toLowerCase()
                return songTitle.includes(searchVal)
            })
            setDisplay(filteredItems)
        }
    
    return (
        <div>
            <h1>All Songs</h1>
            <div className='search'>
            <input value={inputValue} placeholder="Search For Song..." onChange={(e)=>searchFunc(e.target.value)}/>
            <span className='searchIcon'><i class="fa fa-search"></i></span>
            </div>
            <div className='flexDisplayPage'>
            {display.map(item=> (
            <div key= {item.id} >
                <Link to= {`/songs/${item.id}`} >
                <img src={`https://img.youtube.com/vi/${item.youtube_link.slice(30)}/hqdefault.jpg`} width="100" height="100"/>
                <div>{item.title}</div>
                </Link>
            </div>
            ))}
            </div>
        </div>
    )
}

export default Songs
