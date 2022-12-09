const express = require('express');
const app = express();
const path = require('path');
const router = require('./scripts/router.js');

router.handleAPI(app);
router.handleCategory(app);
router.handleInPainting(app);
router.handleSearch(app);
router.handleYears(app);

let port = 8080;
app.listen(port, () => {
    console.log("Server running at port= " + port);
});
