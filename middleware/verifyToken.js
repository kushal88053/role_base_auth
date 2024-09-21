const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const tokenFromHeader =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  const tokenFromCookie = req.cookies.token || null;

  const tokenFromBody = req.body.token || null;

  const token = tokenFromHeader || tokenFromCookie || tokenFromBody;

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
