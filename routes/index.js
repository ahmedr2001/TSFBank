const router = require('express').Router();

router.get("/", (req, res) => {
    res.render("pages/home", {
        title: 'TSFBank',
        files: 'home'
    });
});

module.exports = router;