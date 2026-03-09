const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");


/* DELETE TASK */

router.delete("/tasks/:id", auth, async (req, res) => {

  try {

    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    res.json({
      message: "Task deleted",
      deleted
    });

  } catch (err) {

    res.status(500).json({
      error: "Delete failed"
    });

  }

});

module.exports = router;