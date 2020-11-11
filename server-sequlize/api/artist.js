const { Router } = require("express");
const { Artist } = require("../models");

const router = Router();

router.get("/", async (req, res) => {
  const allArtists = await Artist.findAll();
  res.json(allArtists);
});

router.post("/", async (req, res) => {
  const newArtist = await Artist.create(req.body);
  res.json(newArtist);
});

router.get("/:artistId", async (req, res) => {
  const artist = await Artist.findByPk(req.params.artistId);
  res.json(artist);
});

module.exports = router;
