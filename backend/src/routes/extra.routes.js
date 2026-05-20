const express =
  require("express");

const router =
  express.Router();

const {
  getExtras
} = require(
  "../controllers/extra.controller"
);

router.get(
  "/",
  getExtras
);

module.exports = router;