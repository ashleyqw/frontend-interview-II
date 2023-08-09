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

/* GET users listing. */
router.get("/flashcards", async function(req, res, next) {
  const dataResults = await db.query('select * from flashcards order by id desc limit 400');
  res.send(dataResults);
});

/* GET users listing. */
router.patch("/flashcards/:id", async function(req, res, next) {
  const id = req.params.id;
  const a = await db.query(`update flashcards set term = '${req.body.term}', definition='${req.body.definition}' where id = ${req.params.id}`);
  res.send(200);
});

router.patch('/flashcards', async function(req, res, next) {
  const { flashcards } = req.body;
  flashcards.forEach(async (flashcard) => {
    await db.query(`update flashcards set term = '${flashcard.term}', definition='${flashcard.definition}' where id = ${flashcard.id}`);
  })
  res.send(200);
});


// Begin coding here

module.exports = router;