const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    const categories = [
        {
            name: 'Category 1'
        },
        {
            name: 'Category 2'
        }
    ];

    res.json(categories);
});

module.exports = router;
