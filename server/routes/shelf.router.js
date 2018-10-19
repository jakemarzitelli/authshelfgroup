const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "item";`)
    .then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log(error);
    })
});


/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
    pool.query(`INSERT INTO "item" ("description", "image_url", "person_id")
        VALUES ($1, $2, $3)`, [req.body.description, req.body.image_url, req.user.id])
});


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
    pool.query(`DELETE FROM "item" WHERE "id" = $1;`, [req.params.id])
    .then(res.sendStatus(200))
    .catch(error => {
        res.sendStatus(500);
    })
});


/**
 * Update an item if it's something the logged in user added
 */
router.put('/', (req, res) => {
    console.log(req.body);
    pool.query(`
    UPDATE "item" 
    SET "description" = $1,
    "image_url" = $2
    WHERE "id" = $3;`, [req.body.description, req.body.image_url, req.body.id])
    .then(res.sendStatus(200))
    .catch(error => {
        res.sendStatus(500);
    })    
});


/**
 * Return all users along with the total number of items 
 * they have added to the shelf
 */
router.get('/count', (req, res) => {

});


/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {

});

module.exports = router;