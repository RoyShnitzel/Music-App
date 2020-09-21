import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom'

function OneArtist({match}) {

    useEffect(() => {
        fetchHomeData()
    }, [])
    
    const [artist,setArtist]= useState([])

    const fetchHomeData = async () => { 
        const fetchData = await fetch(`/api/artists/${match.params.id}`)
        const newItems = await fetchData.json()
        console.log(newItems)
        setArtist(newItems)
        }
        
    const artistName = [...new Set(artist.map((item)=>(`${item.name}`)))]
    const artistCoverImg = [...new Set(artist.map((item)=>(`${item.cover_img}`)))]
    const arrSongsTitle = [...new Set(artist.map((item)=>(`${item.title}`)))]
    const arrSongsTime = [...new Set(artist.map((item)=>(`${item.time}`)))]
    const arrSongsLink = [...new Set(artist.map((item)=>(`${item.youtube_link.slice(30)}`)))]
    const arrSongsId = artist.map((item)=>(`${item.songsId}`))
    const finalSongsArr = arrSongsTitle.map((item,i) => (
    <li className='songsList' key={item}>
        <img src={`https://img.youtube.com/vi/${arrSongsLink[i]}/hqdefault.jpg`} alt='Views' width="40" height="40"/>
        <Link to={`/songs/${arrSongsId[i]}?artist=${match.params.id}`}>{item}</Link>
        <span>{artistName ? artistName[0]:'loading...'}</span>
        <span>{arrSongsTime[i].slice(3)}</span>
    </li>
    ))
    const arrAlbumsTitle = [...new Set(artist.map((item)=>(`${item.albumName}`)))]
    const arrAlbumsId = artist.map((item)=>(`${item.albumsId}`))
    const arrAlbumsImg = artist.map((item)=>(`${item.albumCover}`))
    const finalAlbumsArr = arrAlbumsTitle.map((item,i) => (
    <li className='songsList' key={item}>
        <img src={arrAlbumsImg[i]} alt='Views' width="40" height="40"/>
        <Link to={`/albums/${arrAlbumsId[i]}`}>{item}</Link>
        <span>{artistName ? artistName[0]:'loading...'}</span>
        <span>Songs: {arrSongsTitle.length}</span>
    </li>
    ))     
    
    return (
        <div >
            {artistName.map((item)=> ( <h1 key= {match.params.id}>{item}</h1>))}
            <div className="flexDisplayOne">
            {artistCoverImg.map((item)=> ( <img key= {match.params.id} src={item} alt="Drake" width="400" height="400"/>))}
            <div>
            <h4>Songs:</h4>
            <ul>
            {finalSongsArr}
            </ul>
            <h4>Albums:</h4>
            <ul>
            {finalAlbumsArr}
            </ul>
            </div>
            </div>
        </div>
    )
}

export default OneArtist