import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function OneAlbum({ match }) {
  useEffect(() => {
    fetchHomeData();
  }, []);

  const [album, setAlbum] = useState([]);

  const fetchHomeData = async () => {
    const fetchData = await fetch(`/api/albums/${match.params.id}`);
    const newItems = await fetchData.json();
    console.log(newItems);
    setAlbum(newItems);
  };

  const arrSongsTitle = [...new Set(album.map((item) => `${item.title}`))];
  const arrSongsId = album.map((item) => `${item.songsId}`);
  const arrSongsTime = [...new Set(album.map((item) => `${item.time}`))];
  const arrSongsLink = [
    ...new Set(album.map((item) => `${item.youtube_link.slice(30)}`)),
  ];
  const finalSongsArr = arrSongsTitle.map((item, i) => (
    <li className="songsList" key={item}>
      <img
        src={`https://img.youtube.com/vi/${arrSongsLink[i]}/hqdefault.jpg`}
        alt="Views"
        width="40"
        height="40"
      />
      <Link to={`/songs/${arrSongsId[i]}?album=${match.params.id}`}>
        {item}
      </Link>
      <span>{album ? album[0].name : "loading..."}</span>
      <span>{arrSongsTime ? arrSongsTime[i].slice(3) : "loading..."}</span>
    </li>
  ));
  const arrArtistsTitle = [
    ...new Set(album.map((item) => `${item.artistName}`)),
  ];
  const arrArtistsId = album.map((item) => `${item.artistId}`);
  const arrArtistsImg = album.map((item) => `${item.artistImg}`);
  const finalArtistsArr = arrArtistsTitle.map((item, i) => (
    <div className="artistsList" key={item}>
      <img src={arrArtistsImg[i]} alt="Views" width="40" height="40" />
      <div>
        <Link to={`/artists/${arrArtistsId[i]}`}>{item}</Link>
      </div>
    </div>
  ));

  return (
    <div>
      <div>
        {album.length > 0 ? <h1>{album[0].name}</h1> : <div>Loading...</div>}
        <div className="flexDisplayOne">
          {album.length > 0 ? (
            <img
              src={album[0].cover_img}
              alt="Views"
              width="400"
              height="500"
            />
          ) : (
            <div>Loading...</div>
          )}
          <div>
            <h4>Songs:</h4>
            <ul>{finalSongsArr}</ul>
            <div className="center">
              <h4>Artists:</h4>
              {finalArtistsArr}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneAlbum;
