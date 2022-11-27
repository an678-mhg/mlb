const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(500).json({
      success: false,
      message: "User is not login !!!",
    });

  try {
    const decoded = jwt.verify(token, process.env.PASSJWT);
    if (decoded.roleId !== "admin")
      return res.status(400).json({
        success: false,
        message: "You need Admin role !!!",
      });

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Token not found !!!",
      error,
    });
  }
};

module.exports = isAdmin;
