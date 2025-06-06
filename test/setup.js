"use strict";

require("dotenv").config();
const awilixContainer = require("../src/ioc-container");

const knex = awilixContainer.resolve("db");

before(async () => {
  // Re-run knex with fresh migrations/seeds
  await knex.migrate.latest();
  // await knex.seed.run();
  return;
});

after(async function () {
  // Destroy knex connection
  await awilixContainer.dispose();
  // await knex.destroy();
  return;
});
