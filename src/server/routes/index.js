const { Router } = require('express');
const router = Router();
router.get('/', function (req, res) {
  if (process.env.NODE_ENV === "production") res.render('app');
  else res.render('hmr');
});

module.exports = router;