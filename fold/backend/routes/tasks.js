const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");


/* DELETE TASK */

router.delete("/:id", auth, async (req, res) => {

  try {

    const deleted = await Task.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Failed to delete task" });

  }

});

module.exports = router;