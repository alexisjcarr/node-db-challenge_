const db = require("../dataConfig");

module.exports = {
  add,
  find,
  findById
};

async function find() {
  return await db("actions");
}

async function findById(project_id) {
  return (
    (await db("actions")
      .where({ project_id })
      .first()) || null
  );
}

async function add(project) {
  const id = await db("actions").insert(project, "id");
  return findById(...id);
}
