const crypto = require("node:crypto");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const generateToken = (userId, role = "student") => {
  return jwt.sign(
    { id: String(userId), role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const formatUser = (user) => ({
  id: String(user._id),
  name: user.name,
  email: user.email,
  role: user.role || "student",
  createdAt: user.createdAt,
});

// REGISTER USER
const register = async (req, res) => {
  try {
    const body = req.body && typeof req.body === "object" ? req.body : {};
    const { name, email, password } = body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: "Please provide valid name, email and password",
      });
    }

    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 80) {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: "Name must be between 2 and 80 characters",
      });
    }

    if (!EMAIL_REGEX.test(normalizedEmail) || normalizedEmail.length > 254) {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: "Please provide a valid email address",
      });
    }

    if (password.length < 6 || password.length > 128) {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: "Password must be between 6 and 128 characters",
      });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        code: "USER_EXISTS",
        message: "An account with this email already exists",
      });
    }

    const user = await User.create({
      name: trimmedName,
      email: normalizedEmail,
      password,
    });

    const token = generateToken(user._id.toString(), user.role || "student");

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: formatUser(user),
    });
  } catch (error) {
    if (error && error.code === 11000) {
      return res.status(409).json({
        success: false,
        code: "USER_EXISTS",
        message: "An account with this email already exists",
      });
    }

    logger.error("auth_register_failed", {
      requestId: req.requestId,
      error,
    });

    return res.status(500).json({
      success: false,
      code: "REGISTRATION_FAILED",
      message: "Registration failed. Please try again.",
    });
  }
};

// LOGIN USER
const login = async (req, res) => {
  try {
    const body = req.body && typeof req.body === "object" ? req.body : {};
    const { email, password } = body;

    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: "Please provide email and password",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email: normalizedEmail }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id.toString(), user.role || "student");

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: formatUser(user),
    });
  } catch (error) {
    logger.error("auth_login_failed", {
      requestId: req.requestId,
      error,
    });

    return res.status(500).json({
      success: false,
      code: "LOGIN_FAILED",
      message: "Login failed. Please try again.",
    });
  }
};

// GET LOGGED-IN USER
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        code: "USER_NOT_FOUND",
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: formatUser(user),
    });
  } catch (error) {
    logger.error("auth_get_me_failed", {
      requestId: req.requestId,
      error,
    });

    return res.status(500).json({
      success: false,
      code: "PROFILE_FETCH_FAILED",
      message: "Unable to fetch user profile",
    });
  }
};

// FORGOT PASSWORD (issues hashed 30-min reset token)
const forgotPassword = async (req, res) => {
  try {
    const email =
      typeof req.body?.email === "string"
        ? req.body.email.trim().toLowerCase()
        : "";

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: "Please provide a valid email address",
      });
    }

    const user = await User.findOne({ email }).select(
      "+resetPasswordTokenHash +resetPasswordExpiresAt"
    );

    let devResetToken;
    if (user) {
      const rawToken = crypto.randomBytes(24).toString("hex");
      user.resetPasswordTokenHash = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");
      user.resetPasswordExpiresAt = new Date(Date.now() + 30 * 60 * 1000);
      await user.save();

      if (process.env.NODE_ENV !== "production") {
        devResetToken = rawToken;
      }
    }

    return res.status(200).json({
      success: true,
      message:
        "If an account exists for that email, a password reset link has been generated.",
      ...(devResetToken
        ? {
            devResetToken,
            notice:
              "Development preview token returned because SMTP email delivery is not configured.",
          }
        : {}),
    });
  } catch (error) {
    logger.error("auth_forgot_password_failed", {
      requestId: req.requestId,
      error,
    });
    return res.status(500).json({
      success: false,
      code: "FORGOT_PASSWORD_FAILED",
      message: "Unable to process password reset request",
    });
  }
};

// RESET PASSWORD
const resetPassword = async (req, res) => {
  try {
    const token =
      typeof req.body?.token === "string" ? req.body.token.trim() : "";
    const password =
      typeof req.body?.password === "string" ? req.body.password : "";

    if (!token || token.length < 16) {
      return res.status(400).json({
        success: false,
        code: "INVALID_RESET_TOKEN",
        message: "A valid reset token is required",
      });
    }

    if (password.length < 6 || password.length > 128) {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: "New password must be between 6 and 128 characters",
      });
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordTokenHash: tokenHash,
      resetPasswordExpiresAt: { $gt: new Date() },
    }).select("+password +resetPasswordTokenHash +resetPasswordExpiresAt");

    if (!user) {
      return res.status(400).json({
        success: false,
        code: "INVALID_OR_EXPIRED_TOKEN",
        message: "Reset token is invalid or has expired",
      });
    }

    user.password = password;
    user.resetPasswordTokenHash = null;
    user.resetPasswordExpiresAt = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully. You can now sign in.",
    });
  } catch (error) {
    logger.error("auth_reset_password_failed", {
      requestId: req.requestId,
      error,
    });
    return res.status(500).json({
      success: false,
      code: "RESET_PASSWORD_FAILED",
      message: "Unable to reset password",
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  generateToken,
  formatUser,
};
