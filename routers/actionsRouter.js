const router = require("express").Router();

const db = require("../data/models/actionsModel");

router.get("/", async (req, res) => {
  try {
    const actions = await db.find();
    res.status(200).json(actions);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
