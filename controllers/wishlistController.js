
const WishlistItem = require("../models/Wishlist");
module.exports = {
  addWishlist: async function (req, res) {
    const { name, price, image, rating } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Item name is required" });
    }

    try {
      const newItem = new WishlistItem({ name, price, image, rating });
      await newItem.save();
      const wishlist = await WishlistItem.find();
      res.json({ wishlist });
    } catch (err) {
      console.error("Server error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  //get
  getWishlist: async function (req, res) {
    try {
      const wishlist = await WishlistItem.find();
      res.json({ wishlist });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  //update
  updateWishlist: async function (req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedItem = await WishlistItem.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      if (!updatedItem) {
        return res.status(404).json({ error: "Wishlist item not found" });
      }

      res.json({ message: "Wishlist updated successfully", updatedItem });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },


  //Delete
  removeWishlist: async function (req, res) {
    try {
      const { id } = req.params; // wishlist item ka id
      const deletedItem = await WishlistItem.findByIdAndDelete(id);
      if (!deletedItem) {
        return res.status(404).json({ error: "Wishlist item not found" });
      }
      const wishlist = await WishlistItem.find();
      res.json({ wishlist });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
}
//  app.listen(5000, () => console.log("✅ Server running on port 5000"));
