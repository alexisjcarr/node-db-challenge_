const db = require("../data/models/actionsModel");
const { validateAction } = require("../middleware");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const actions = await db.find();
    res.status(200).json(actions);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/", validateAction, async (req, res) => {
  try {
    const action = await db.add(req.body);
    res.status(201).json(action);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
