const { User } = require("../Model/Token");
const bcrypt = require("bcryptjs");
//user
const register = async (req, res, next) => {
  console.log("Incoming Request Body:", req.body); // Log incoming data
  try {
    const { fname, lname, email, password } = req.body;
    console.log("in auth controllers");
    console.log(fname, lname, email, password);
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ message: "User already exist" });
    }
    const userCreated = await User.create({
      fname,
      lname,
      email,
      password,
    });
    console.log("User Created:", userCreated); // Log user creation
    res.status(200).json({
      msg: userCreated,
      token: await userCreated.generateToken(),
    });
  } catch (error) {
    console.error("Error in Register Route:", error); // Log errors
    next(error); // Pass the error to the error middleware
  }
};

// *-------------------------------
//* User Login Logic 📝
// *-------------------------------

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log(
        "Missing credentials - Email:",
        !!email,
        "Password:",
        !!password
      );
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const userExist = await User.findOne({ email });
    if (!userExist) {
      console.log("No user found with email:", email);
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    console.log("Password validation result:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = await userExist.generateToken();
    console.log("Generated token:", token);

    // Verify token immediately to ensure it's valid
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token verified successfully");
    } catch (tokenError) {
      console.error("Token verification failed:", tokenError);
      return res.status(500).json({
        message: "Error generating authentication token",
      });
    }

    res.status(200).json({
      message: "Login Successful",
      token,
      userId: userExist._id.toString(),
    });
  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
};

module.exports = { register, login };
