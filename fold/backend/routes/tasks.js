const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

/* DELETE TASK */

router.delete("/tasks/:id", async (req, res) => {

  try {

    const deleted = await Task.findByIdAndDelete(req.params.id);

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