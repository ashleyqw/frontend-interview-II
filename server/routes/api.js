const express = require("express");
const router = express.Router();
const { db } = require('../adapters/postgres');

// Sample code to show syntax, not relevant to application but should help get started

/* GET users listing. */
router.get("/flashcard-ideas", async function(req, res, next) {
  const dataResults = await db.query('select * from flashcards');
  const allDefinitions = dataResults.map( (result) => result.definition);
  res.send({ definitions: allDefinitions });
});

// Begin coding here

module.exports = router;
