const { Router } = require("express");
const { Album } = require("../models");

const router = Router();

router.get("/", async (req, res) => {
  const allAlbums = await Album.findAll({
    // include: ['Songs','Artist']
  });
  res.json(allAlbums);
});

router.get("/:albumId", async (req, res) => {
  const album = await Album.findByPk(req.params.albumId);

  const duration = await album.getDuration();
  res.json({ ...album.get(), duration });
});

module.exports = router;
