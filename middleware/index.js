module.exports = {
  validateProject
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
