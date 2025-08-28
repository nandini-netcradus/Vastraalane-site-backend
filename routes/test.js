const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create dummy user
router.post("/dummy-user", async (req, res) => {
  try {
    const user = new User({
      name: "Sagar",
      email: "sagar@example.com",
      password: "123456",
      shippingAddress: {
        fullName: "Sagar Sharma",
        phone: "9876543210",
        street: "123 MG Road",
        city: "Pune",
        state: "Maharashtra",
        zip: "411001",
        country: "India"
      }
    });
    await user.save();

    res.json({ message: "Dummy user created", userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
