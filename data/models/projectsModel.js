const db = require("../dbConfig");

module.exports = {
  add,
  find,
  findById,
  update,
  remove
};

async function find() {
  return await db("projects");
}

async function findById(id) {
  // SELECT * FROM actions AS a INNER JOIN projects AS p ON a.project_id = p.id
  const project = await db("projects").where({ id });
  const project_actions = await db("actions")
    .join("projects", "actions.project_id", "projects.id")
    .select("*")
    .where("projects.id", id);

  const result = {
    ...project[0],
    completed: project.completed === 1 ? true : false
  };

  result.actions = project_actions.map(action => ({
    ...action,
    completed: action.completed === 1 ? true : false
  }));

  return result;
}

async function add(project) {
  const id = await db("projects")
    .insert(project, "id")
    .returning("*");
  return findById(...id);
}

async function update(id, changes) {
  const updated = db("projects")
    .where({ id })
    .update(changes);
  return findById(updated);
}

async function remove(id) {
  const delProj = await findById(id);
  const del_ = db("projects")
    .where({ id })
    .del();
  return del_ ? delProj : null;
}
