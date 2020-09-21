import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Home() {
    
    useEffect(() => {
        fetchHomeData()
    }, [])
    
    const [songs,setSongs]= useState([])
    const [albums,setAlbums]= useState([])
    const [artists,setArtists]= useState([])
    const [playlist,setPlaylist]= useState([])

    const fetchHomeData = async () => {
        const categorys = ['songs','albums','artists','playlist']
        const functions = [setSongs, setAlbums, setArtists, setPlaylist] 
        categorys.forEach(async (category,i)=>{  
            const fetchData = await fetch(`/api/top_${category}`)
            const newItems = await fetchData.json()
            console.log(newItems)
            functions[i](newItems)
        })
    }

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5,
          slidesToSlide: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1
        }
      };

    return (
        <div>
 
            <div className='flexDisplayHome'>
            <h2>Top Songs</h2>
            <Carousel
             responsive={responsive}
            className= 'horizontalList'
            swipeable={false}
            draggable={false}
            >
            {songs.map(item=> 
            (
            <div key= {item.id} >
              <img src={`https://img.youtube.com/vi/${item.youtube_link.slice(30)}/hqdefault.jpg`} alt='Views' width="100" height="100"/>
              <div><Link to= {`/songs/${item.id}?top_songs=20`}>{item.title}</Link></div>
            </div>
            ))}
            </Carousel>
            <h2>Top Artists</h2>
            <Carousel 
            responsive={responsive} 
            className= 'horizontalList'
            swipeable={false}
            draggable={false}
            >
            {artists.map(item=> (
            <div key= {item.id} >
              <img src={item.cover_img} alt='Views' width="100" height="100"/>
              <div><Link to= {`/artists/${item.id}`}>{item.name}</Link></div>
            </div>
            ))}
            </Carousel>
            <h2>Top Albums</h2>
            <Carousel 
            responsive={responsive} 
            className= 'horizontalList'
            swipeable={false}
            draggable={false}
            >
            {albums.map(item=> (
            <div key= {item.id}>
              <img src={item.cover_img} alt='Views' width="100" height="100"/>
              <div><Link to= {`/albums/${item.id}`}>{item.name}</Link></div>
            </div>
            ))}
            </Carousel>
            <h2>Top PlayLists</h2>
            <Carousel 
            responsive={responsive} 
            className= 'horizontalList'
            swipeable={false}
            draggable={false}
            >
            {playlist.map(item=> (
            <div key= {item.id} >
              <img src={item.cover_img} alt='Views' width="100" height="100"/>
              <div><Link to= {`/playlists/${item.id}`}>{item.name}</Link></div>
            </div>
            ))}
            </Carousel>
            </div>
        </div>
    )
}

export default Home
