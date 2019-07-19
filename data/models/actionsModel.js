const db = require("../dbConfig");

module.exports = {
  add,
  find,
  findById,
  update,
  remove
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

// no
async function add(action) {
  const id = await db("actions")
    .insert(action, "id")
    .returning("*");
  return findById(...id);
}

async function update(id, changes) {
  const updated = db("actions")
    .where({ id })
    .update(changes);
  return findById(updated);
}

async function remove(id) {
  const delProj = await findById(id);
  const del_ = db("actions")
    .where({ id })
    .del();
  return del_ ? delProj : null;
}
