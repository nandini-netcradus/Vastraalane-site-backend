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

const allowedOrigins = [
  'http://localhost:3000', // local dev
  'https://vastraalane-site-frontend.vercel.app' // deployed frontend
];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like Postman)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // if you’re sending cookies or auth headers
}));


// ✅ Handle preflight requests for all routes
// app.options("*", cors());

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

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log(authHeader,"auth");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  // TODO: verify JWT or token
  req.user = { id: "demoUser" };
  next();
}
// ✅ Routes usage
app.use("/api/users", userRoutes);       
app.use("/api/wishlist", authMiddleware, wishlistRoutes); 
app.use("/api/test", testRoutes);
app.use("/profile", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);

// ✅ Start Server
app.listen(5000, () => console.log("✅ Server running on port 5000"));
