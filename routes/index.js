const express = require("express");
const router = express.Router();
const io = require("socket.io");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/createRoom", (req, res, next) => {
  res.render("createRoom");
});
router.post("/createRoom", (req, res, next) => {
  console.log("entered the route");
  const socket = io.connect("http://localhost");
  socket.emit("test", { msg: "Test" });
});
router.post("/joinRoom", (req, res, next) => {
  res.render("joinRoom");
});
module.exports = router;
