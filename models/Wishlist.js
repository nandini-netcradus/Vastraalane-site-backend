const mongoose = require("mongoose");
const wishlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: String,
  image: String,
  rating: String,
});
module.exports= mongoose.model("WishlistItem", wishlistSchema);