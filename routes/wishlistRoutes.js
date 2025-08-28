const express = require("express");
const router = express.Router();
const Wishlistcontrollers = require("../controllers/Wishlistcontrollers");

// Add item
router.post("/", Wishlistcontrollers.addWishlist);

// Get wishlist
router.get("/", Wishlistcontrollers.getWishlist);

// Update wishlist
router.put("/", Wishlistcontrollers.updateWishlist); // ✅ Corrected

// Delete wishlist
router.delete("/:id", function (req, res) {
        Wishlistcontrollers.removeWishlist(req, res)
    }
); 

module.exports = router;
