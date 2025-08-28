const express = require("express");
const router = express.Router();
const User = require("../models/User"); // apna user model import karo

// Get Profile
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
});

// Update Profile
router.put("/:id", async (req, res) => {
  try {
    const { email, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { email, phone },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
});

module.exports = router;
