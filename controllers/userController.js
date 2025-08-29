const User = require("../models/User");

// Get user details + shipping address
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get shipping address only
exports.getAddress = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // console.log(user,'user in get address');
    if (!user) return res.status(404).json({ message: "User not found" });

    // Always return an object with shippingAddress key
    res.json({ shippingAddress: user.shippingAddress|| null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Update shipping address
exports.updateAddress = async (req, res) => {
  try {
    const { fullName, phone, street, city, state, pincode, country } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        shippingAddress: { fullName, phone, street, city, state, pincode, country },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

     res.json({
        message: "Adddress added sucessfully",
        shippingAddress: user .shippingAddress
      });
    }
    catch(err) {
      res.status(500).json({error:err.message });
    }
  };
    

exports.addAddress = async (req, res) => {
  // console.log(req.params);
  const { userId } = req.params;
  const {
    fullName,
    phone,
    street,
    city,
    state,
    pincode,
    country
  } = req.body;

  try {
    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update shipping address
    user.shippingAddress = {
      fullName,
      phone,
      street,
      city,
      state,
      pincode,
      country
    };

    await user.save();

    res.status(200).json({
      message: "Shipping address saved successfully",
      shippingAddress: user.shippingAddress
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // console.log(user,'user in get address');
    if (!user) return res.status(404).json({ message: "User not found" });
    user.shippingAddress = undefined; 
    await user.save();


    // Always return an object with shippingAddress key
    res.status(200).json({
      message: "Shipping address saved successfully",
      shippingAddress: null
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};