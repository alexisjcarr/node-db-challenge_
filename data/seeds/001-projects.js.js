exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("projects")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("projects").insert([
        {
          name: "Complete Node.js and Express Challenge",
          description:
            "Build and Awesome API Using Node.js and Express to Manage Projects and Actions GTD Style!"
        }
      ]);
    });
};
