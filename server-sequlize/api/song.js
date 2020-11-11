const { Router } = require("express");
const { Song } = require("../models");

const router = Router();

router.get("/", async (req, res) => {
  const allSongs = await Song.findAll();
  res.json(allSongs);
});

router.post("/", async (req, res) => {
  const newSongs = await Song.create(req.body);
  res.json(newSongs);
});

module.exports = router;
