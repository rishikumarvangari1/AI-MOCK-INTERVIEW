const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        code: "UNAUTHORIZED",
        message: "Authentication token required",
        requestId: req.requestId,
      });
    }

    const token = authHeader.slice(7).trim();
    if (!token) {
      return res.status(401).json({
        success: false,
        code: "UNAUTHORIZED",
        message: "Authentication token required",
        requestId: req.requestId,
      });
    }

    const secret = (process.env.JWT_SECRET || "").trim();
    if (!secret) {
      return res.status(503).json({
        success: false,
        code: "AUTH_MISCONFIGURED",
        message: "Authentication service is not configured",
        requestId: req.requestId,
      });
    }

    const decoded = jwt.verify(token, secret);

    req.user = {
      id: String(decoded.id),
      role: decoded.role || "student",
    };

    return next();
  } catch {
    return res.status(401).json({
      success: false,
      code: "INVALID_TOKEN",
      message: "Invalid or expired token",
      requestId: req.requestId,
    });
  }
};

module.exports = authMiddleware;
