// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const app = express();

// app.use(cors());
// app.use(express.json());

// // MongoDB Atlas connection
// const uri = "mongodb+srv://nandini:Nandini0910@cluster0.fxswzqg.mongodb.net/wishlistDB?retryWrites=true&w=majority&appName=Cluster0";

// mongoose.connect(uri)
//   .then(() => console.log("✅ MongoDB Atlas connected"))
//   .catch(err => console.error("MongoDB connection error:", err));

// // Routes import
// require("./routes")(app);

// app.listen(5000, () => console.log("✅ Server running on port 5000"));


const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Atlas connection
const uri = "mongodb+srv://nandini:Nandini0910@cluster0.fxswzqg.mongodb.net/wishlistDB?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Routes import
const userRoutes = require("./routes/userRoutes");   
const wishlistRoutes = require("./routes/wishlistRoutes"); 
const testRoutes = require("./routes/test");
const profileRoutes = require("./routes/profileRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");


// ✅ Routes usage
app.use("/api/users", userRoutes);       
app.use("/api/wishlist", wishlistRoutes); 
app.use("/api/test", testRoutes);
app.use("/profile", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);

// ✅ Start Server
app.listen(5000, () => console.log("✅ Server running on port 5000"));
