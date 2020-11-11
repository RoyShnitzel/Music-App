const express = require("express");
const app = express();
const mysql = require("mysql");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let mysqlCon = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true,
});

mysqlCon.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/api/top_:tableName", (req, res) => {
  let newTable = req.params.tableName;
  console.log(newTable);
  mysqlCon.query(
    `SELECT * FROM ${newTable} LIMIT 20;`,
    (error, results, fields) => {
      if (error) {
        res.send(error.message);
        throw error;
      }
      res.send(results);
    }
  );
});

app.get("/api/:tableName/:id", (req, res) => {
  let table = req.params.tableName;
  let id = req.params.id;
  const sql =
    table === "playlist"
      ? `SELECT playlist.*,songs.*, songs.id AS songsId FROM playlist JOIN songs_in_playlist 
    ON playlist_id = playlist.id JOIN songs ON song_id = songs.id  WHERE playlist.id = ${id};`
      : table === "artists"
      ? `SELECT artists.*, songs.*,songs.id AS songsId,albums.cover_img AS albumCover,albums.name AS albumName,albums.id AS albumsId FROM artists JOIN songs 
    ON artists.id = songs.artist 
    JOIN albums_and_artist
    ON artists.id= artist_id
    JOIN albums
    ON album_id = albums.id
    WHERE artists.id = ${id};`
      : table === "albums"
      ? `SELECT albums.*,artists.id AS artistId,artists.name AS artistName,artists.cover_img AS artistImg,songs.title,songs.youtube_link,songs.time , songs.id AS songsId FROM albums
    JOIN albums_and_artist
    ON albums.id = albums_and_artist.album_id
    JOIN artists
    ON artists.id = albums_and_artist.artist_id
    JOIN songs
    ON songs.album = albums.id 
    WHERE albums.id =${id};`
      : `SELECT *,albums.name AS albumName,artists.name AS artistName FROM songs
    JOIN albums
    ON albums.id = songs.album
    JOIN artists
    ON artists.id = songs.artist
    WHERE songs.id = ${id};`;
  mysqlCon.query(sql, (error, results, fields) => {
    if (error) {
      res.send(error.message);
      throw error;
    }
    res.send(results);
  });
});

app.get("/api/:tableName", (req, res) => {
  let table = req.params.tableName;
  let id = req.params.id;
  mysqlCon.query(`SELECT * FROM ${table};`, (error, results, fields) => {
    if (error) {
      res.send(error.message);
      throw error;
    }
    res.send(results);
  });
});

app.post("/api/:tableName", (req, res) => {
  let table = req.params.tableName;
  let newTable = table === "playlist" ? table : `${table}s`;
  let data = req.body;
  console.log(data);
  mysqlCon.query(
    `INSERT INTO ${newTable} SET ?;`,
    data,
    (error, results, fields) => {
      if (error) {
        res.send(error.message);
        throw error;
      }
      res.send(results);
    }
  );
});

app.put("/api/:tableName/:id", (req, res) => {
  let id = req.params.id;
  let table = req.params.tableName;
  let newTable = table === "playlist" ? table : `${table}s`;
  let data = req.body;
  console.log(data);
  mysqlCon.query(
    `UPDATE ${newTable} SET ? WHERE ${newTable}.id=${id};`,
    data,
    (error, results, fields) => {
      if (error) {
        res.send(error.message);
        throw error;
      }
      res.send(results);
    }
  );
});

app.delete("/api/:tableName/:id", (req, res) => {
  let id = req.params.id;
  let table = req.params.tableName;
  let newTable = table === "playlist" ? table : `${table}s`;
  mysqlCon.query(
    `DELETE FROM ${newTable} WHERE ${newTable}.id=${id};`,
    (error, results, fields) => {
      if (error) {
        res.send(error.message);
        throw error;
      }
      res.send(results);
    }
  );
});

app.listen(3001);
