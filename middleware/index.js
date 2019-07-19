module.exports = {
  validateProject,
  validateAction
};

function validateProject(req, res, next) {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({
      error: "Please add a name and a description."
    });
  } else {
    next();
  }
}

function validateAction(req, res, next) {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    res.status(400).json({
      error: "Please add a project_id, description, and notes."
    });
  } else {
    next();
  }
}
