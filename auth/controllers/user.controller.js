const User = require("../models/User");
const bc = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const secret = config.get("secret");

exports.register = async (req, res) => {
  const { fullName, email, phone, password } = req.body;
  try {
    const existantUser = await User.findOne({ email });
    if (existantUser)
      return res.status(400).json({ msg: "User already exists" });
    const newUser = new User({
      fullName,
      email,
      phone,
      password,
    });
    var salt = await bc.genSalt(10);
    var hash = await bc.hash(password, salt);
    newUser.password = hash;
    await newUser.save();
    const payload = {
      id: newUser._id,
    };
    const token = jwt.sign(payload, secret);
    res.send({
      token,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) res.status(404).json({ msg: "Invalid email or password" });
    const isMatch = await bc.compare(password, user.password);
    if (!isMatch) res.status(401).json({ msg: "Invalid email or password" });
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, secret);
    res.send({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getUser = (req, res) => {
  res.send(req.user);
};
