const db = require("../data/models/projectsModel");
const { validateProject } = require("../middleware");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const projects = await db.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const project = await db.findById(id);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/", validateProject, async (req, res) => {
  try {
    const project = await db.add(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.put("/:id", validateProject, async (req, res) => {
  const { id } = req.params;
  try {
    const project = await db.update(id, req.body);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const project = await db.remove(id);
    if (!project) {
      res.status(404).json({
        error: `Project with id ${id} doesn't exist.`
      });
    } else {
      res.status(200).json(project);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
