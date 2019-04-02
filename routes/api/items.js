const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Item = require("../../models/Item");

// @route GET api/items
// @desc Get All items
// @access Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route POST api/items/add
// @desc Add an item
// @access Public
router.post("/add", (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });
  newItem.save().then(item => res.json(item));
});

// @route DETELE api/items/:id
// @desc Delete an item
// @access Public
router.delete("/:id", (req, res) => {
  Item.findOne({ _id: req.params.id })
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
