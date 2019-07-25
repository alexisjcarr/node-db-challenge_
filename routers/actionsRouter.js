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

router.put("/:id", validateAction, async (req, res) => {
  const { id } = req.params;
  try {
    const action = await db.update(id, req.body);
    res.status(200).json(action);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const action = await db.remove(id);
    if (!action) {
      res.status(404).json({
        error: `action with id ${id} doesn't exist.`
      });
    } else {
      res.status(200).json(action);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
