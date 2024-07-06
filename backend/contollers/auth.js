const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const registerController = async (req, res) => {
  const { name, password, email} = req.body;

  console.log('Register req recieved for: ',email)

  const user = await User.findOne({ email: email });
  if (user) {
    return res.status(400).json({ message: "User already exists", code: 1 });
  } else {
    const hashedPass = await bcrypt.hash(password, 10);
    var url = gravatar.url(email,{ s: "200", r: "pg", d: "mm" },true)
    try {
      if (email.includes("@") && email.includes(".")) {
        const newUser = new User({
          username:name,
          password: hashedPass,
          email:email,
          image:url
        });
        const createdUser = await newUser.save();
        console.log(createdUser);

        try {
          const token = jwt.sign(
            {
              userId: createdUser.Username,
              email: createdUser.Email,
            },
            process.env.ACCESS_TOKEN,
            { expiresIn: "86400s" }
          );
          return res.status(200).json({
            message: "User created successfully",
            secrete_token: token,
            user: createdUser,
          });
        } catch (err) {
          return res.status(500).json({ error: err });
        }
      } else {
        return res.status(401).json({ message: "Invalid email", code: 2 });
      }
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
};

const loginController = async (req, res) => {
  const { password, email } = req.body;

  console.log("Login req received for: " + email)

  if (email.includes("@") && email.includes(".")) {
    const user = await User.findOne({ email: email });

    if (user) {
      const correctPassword = await bcrypt.compare(password, user.password);
      try {
        if (correctPassword) {
          const token = jwt.sign(
            {
              userId: user.username,
              email: email,
            },
            process.env.ACCESS_TOKEN,
            { expiresIn: "86400s" }
          );
          return res.status(200).json({
            message: "User logged in successfully",
            secrete_token: token,
            user: user,
          });
          
        } else {
          return res.status(400).json({ message: "Invalid password", code: 4 });
        }
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    } else {
      return res.status(400).json({ message: "User does not exists", code: 3 });
    }
  } else {
    return res.status(401).json({ message: "Invalid email", code: 2 });
  }
};

exports.loginController = loginController;

exports.registerController = registerController;
