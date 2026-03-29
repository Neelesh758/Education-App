import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json("No token");

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json("Invalid token");
  }
};

export const isTeacher = (req, res, next) => {
  if (req.user.role !== "teacher") {
    return res.status(403).json("Only teachers allowed");
  }
  next();
};
