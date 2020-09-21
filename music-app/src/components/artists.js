import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

function Artists() {

    useEffect(() => {
        fetchHomeData()
    }, [])
    
    const [artists,setArtists]= useState([])
    const [inputValue,setInputValue]= useState([])
    const [display, setDisplay] = useState([])

    const fetchHomeData = async () => { 
        const fetchData = await fetch(`/api/artists`)
        const newItems = await fetchData.json()
        console.log(newItems)
        setArtists(newItems)
        setDisplay(newItems)
        }

        const searchFunc = (val) => {
            setInputValue(val)
            const searchVal = val.toLowerCase()
            const filteredItems = artists.filter(artist=>{
                const artistTitle = artist.name.toLowerCase()
                return artistTitle.includes(searchVal)
            })
            setDisplay(filteredItems)
        }

    return (
        <div>
            <h1>Artists</h1>
            <div className='search'>
            <input value={inputValue} placeholder="Search For Artist..." onChange={(e)=>searchFunc(e.target.value)}/>
            <span className='searchIcon'><i class="fa fa-search"></i></span>
            </div>
            <div className='flexDisplayPage'>
            {display.map(item=> (
            <div key= {item.id} >
                <img src={item.cover_img} alt='My PlatList' width="100" height="100"/>
                <div><Link to= {`/artists/${item.id}`}>{item.name}</Link></div>
            </div>
            ))}
        </div>
        </div>
    )
}

export default Artists