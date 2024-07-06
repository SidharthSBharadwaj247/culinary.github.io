const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    // Authorization: 'Bearer TOKEN'
    const token = req.headers.authorization;
    // console.log(token)

    if (!token) {
      console.log("Verification failed")
      return res.status(400).json({ message: "Verification failed" });
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
    console.log(decodedToken)

    res.locals.userData = {
      userEmail: decodedToken.email,
      userId: decodedToken.userId
    };
    next();
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
