import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

function Albums() {

    useEffect(() => {
        fetchHomeData()
    }, [])
    
    const [albums,setAlbums]= useState([])
    const [inputValue,setInputValue]= useState([])
    const [display, setDisplay] = useState([])

    const fetchHomeData = async () => { 
        const fetchData = await fetch(`/api/albums`)
        const newItems = await fetchData.json()
        console.log(newItems)
        setAlbums(newItems)
        setDisplay(newItems)
        }

        const searchFunc = (val) => {
            setInputValue(val)
            const searchVal = val.toLowerCase()
            const filteredItems = albums.filter(album=>{
                const albumTitle = album.name.toLowerCase()
                return albumTitle.includes(searchVal)
            })
            setDisplay(filteredItems)
        }

    return (
        <div>
            <h1>Albums</h1>
            <div className='search'>
            <input value={inputValue} placeholder="Search For Album..." onChange={(e)=>searchFunc(e.target.value)}/>
            <span className='searchIcon'><i class="fa fa-search"></i></span>
            </div>
            <div className='flexDisplayPage'>
            {display.map(item=> (
            <div key= {item.id} >
                <img src={item.cover_img} alt='My PlatList' width="100" height="100"/>
                <div><Link to={`/albums/${item.id}`}>{item.name}</Link></div>
            </div>
            ))}
            </div>
        </div>
    )
}

export default Albums
