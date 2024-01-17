const express = require("express");

const {
  createWine,
  getWine,
  updateWine,
  deleteWine,
  getUserWines,
} = require("../controllers/WineController");
const validateToken = require("../middleware/validateToken");
const router = express.Router();
router.post("/", validateToken, createWine);
router.get("/", validateToken, getUserWines);
router.get("/:wine_id", validateToken, getWine);
router.patch("/:wine_id", validateToken, updateWine);
router.delete("/:wine_id", validateToken, deleteWine);

module.exports = router;
