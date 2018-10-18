const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    pool.query(`SELECT 
        "person"."id",
        "person"."username",
        COUNT("item"."id") as "number_of_items"
    FROM "person"
    JOIN "item" ON "person"."id" = "item"."person_id"
    GROUP BY "person"."id";`)
    .then((result) => {
        res.send(result.rows)
    }).catch(error => {
        console.log('error getting total', error);
        
    })
});

module.exports = router;