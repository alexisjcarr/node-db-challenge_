const db = require("../dbConfig");

module.exports = {
  add,
  find,
  findById
};

async function find() {
  return await db("projects");
}

async function findById(id) {
  return (
    (await db("projects")
      .where({ id })
      .first()) || null
  );
}

async function add(project) {
  const id = await db("projects").insert(project, "id");
  return findById(...id);
}
