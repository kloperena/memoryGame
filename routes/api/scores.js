const router = require("express").Router();
const scoresController = require("../../controllers/scoresController");

// Matches with "/api/books"
router.route("/")
  .get(scoresController.findAll)
  .post(scoresController.create);

// Matches with "/api/books/:id"
router
  .route("/scores")
  .get(scoresController.findById)
  .put(scoresController.update)
  .delete(scoresController.remove);

module.exports = router;
