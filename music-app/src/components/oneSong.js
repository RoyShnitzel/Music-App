import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

function OneSong({ match, location }) {
  useEffect(() => {
    fetchHomeData();
  }, [match]);

  const [song, setSong] = useState([]);
  const [sideList, setSideList] = useState([]);
  const [displayLyrics, setDisplayLyrics] = useState("none");

  const qParams = new URLSearchParams(location.search);
  let playlist = { table: "playlist", id: qParams.get("playlist") };
  let artist = { table: "artists", id: qParams.get("artist") };
  let album = { table: "albums", id: qParams.get("album") };
  let topSongs = { table: "songs", id: qParams.get("top_songs") };
  const sideListId = playlist.id
    ? playlist
    : artist.id
    ? artist
    : album.id
    ? album
    : topSongs.id
    ? topSongs
    : undefined;
  console.log(sideListId);

  function showLyrics() {
    displayLyrics === "none"
      ? setDisplayLyrics("block")
      : setDisplayLyrics("none");
  }

  const fetchHomeData = async () => {
    const sideListFetch = sideListId
      ? sideListId.table === "songs"
        ? await fetch(`/api/top_${sideListId.table}`)
        : await fetch(`/api/${sideListId.table}/${sideListId.id}`)
      : [];
    const newSideList = sideListId ? await sideListFetch.json() : [];
    const fetchData = await fetch(`/api/songs/${match.params.id}`);
    const newItems = await fetchData.json();
    console.log(newItems);
    setSong(newItems);
    setSideList(newSideList);
  };

  const arr = [...new Set(sideList.map((item) => `${item.title}`))];
  const arrSongsLink = [
    ...new Set(sideList.map((item) => `${item.youtube_link.slice(30)}`)),
  ];
  const arrSongsTime = [...new Set(sideList.map((item) => `${item.time}`))];
  const arrSongsName = [...new Set(sideList.map((item) => `${item.name}`))];
  const arrSongsTrack = [
    ...new Set(sideList.map((item) => `${item.track_number}`)),
  ];
  const arrId = [...new Set(sideList.map((item) => item.songsId))];
  const finalArr = arr
    .map((item, i) => {
      return (
        <li className="songsList" key={item}>
          <img
            src={`https://img.youtube.com/vi/${arrSongsLink[i]}/hqdefault.jpg`}
            alt="Views"
            width="40"
            height="40"
          />
          <NavLink
            activeStyle={{
              fontWeight: "bold",
              color: "red",
            }}
            to={`/songs/${
              sideListId.table === "songs" ? sideList[i].id : arrId[i]
            }?${
              sideListId.table === "playlist"
                ? sideListId.table
                : sideListId.table === "artists"
                ? "artist"
                : sideListId.table === "albums"
                ? "album"
                : "top_songs"
            }=${sideListId.id}`}
          >
            {item}
          </NavLink>
          <span>{arrSongsName[0]}</span>
          <span>
            {sideListId.table === "playlist"
              ? `Song Number: ${arrSongsTrack[i]}`
              : sideListId.table === "songs"
              ? sideList[i].time.slice(3)
              : arrSongsTime[i].slice(3)}
          </span>
        </li>
      );
    })
    .slice(0, 9);

  return (
    <div>
      <div className="flexDisplay">
        {song.map((item) => (
          <div key={item.id}>
            <h1>{item.title}</h1>
            <div>Artist: {item.artistName}</div>
            <div>Album: {item.albumName}</div>
            <div>length: {item.time}</div>
            <div>Release Date: {new Date(item.created_at).toDateString()}</div>
            <iframe width="420" height="315" src={item.youtube_link}></iframe>
          </div>
        ))}
        <div>
          {finalArr.length > 0 ? <h4>Related Songs:</h4> : null}
          <ul>{finalArr}</ul>
          <button className="lyricButton" onClick={() => showLyrics()}>
            {displayLyrics === "none" ? "Show Lyrics" : "Hide Lyrics"}
          </button>
        </div>
      </div>
      {song.map((item) => (
        <div style={{ display: displayLyrics }} key={`key${item.id}`}>
          <h3>Lyrics:</h3>
          <div className="lyrics">{item.lyric}</div>
        </div>
      ))}
    </div>
  );
}

export default OneSong;
