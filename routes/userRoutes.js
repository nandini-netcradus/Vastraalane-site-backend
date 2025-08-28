// const express = require("express");
// const router = express.Router();
// const { saveAddress, getAddress } = require("../controllers/userController");

// // Save/Update address
// router.post("/address", saveAddress);

// // Get address by userId
// router.get("/address/:userId", getAddress);

// module.exports = router;


const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Get user shipping address
router.get("/:id/address", userController.getAddress);

// Update/Add shipping address
router.put("/:id/address", userController.updateAddress);

//Add new 
router.post("/:userId/address", userController.addAddress);

// Add delete 
// router.delete("/:id/address/:addressId", userController.deleteAddress);

module.exports = router;
