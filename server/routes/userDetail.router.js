const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/*  
 *  information about a specific user, including each
 *  item they've added to the shelf.
 *  We specify id and username so that we don't send the
 *  password hashes to the client.
 */
router.get('/:id', (req, res) => {
    pool.query(`SELECT
    "person"."id",
    "person"."username",
    json_agg("item") AS "items"
FROM "person"
LEFT JOIN "item" ON "person"."id" = "item"."person_id"
WHERE "person"."id" = $1
GROUP BY "person"."id";`, [req.params.id])
        .then((result) => {
            res.send(result.rows)
        }).catch(error => {
            console.log('error getting total', error);

        })
});

module.exports = router;