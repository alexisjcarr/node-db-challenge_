const db = require("../dbConfig");

module.exports = {
  add,
  find,
  findById
};

async function find() {
  return await db("actions");
}

async function findById(id) {
  return (
    (await db("actions")
      .where({ id })
      .first()) || null
  );
}

async function add(project) {
  const id = await db("actions").insert(project, "id");
  return findById(...id);
}
