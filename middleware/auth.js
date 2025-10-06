import { verifyToken } from "../utils/crypt.js";
import { dbLogger, appLogger } from "../utils/logger.js";

export const isLoggedIn = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      appLogger.info("Unauthorized Access Attempt");
      dbLogger.info("Unauthorized Access Attempt");
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const validToken = verifyToken(token);
    if (!validToken) {
      appLogger.info("Invalid Token");
      dbLogger.info("Invalid Token");
      return res.status(401).json({ message: "Invalid Token" });
    }
    req.decodedToken = validToken;
    next();
    return;
  } catch (error) {
    appLogger.error("Authentication Error:", error);
    dbLogger.error("Authentication Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    const decodedToken = req.decodedToken;
    if (decodedToken.role !== "ADMIN") {
      appLogger.info("Forbidden Access Attempt");
      dbLogger.info("Forbidden Access Attempt");
      return res.status(403).json({ message: "Forbidden: Access is denied" });
    }
    next();
    return;
  } catch (error) {
    appLogger.error("Authorization Error:", error);
    dbLogger.error("Authorization Error:", error);
    res.status(500).json({ message: "Authorization Error", error });
  }
};

export const isCandidate = (req, res, next) => {
  try {
    const decodedToken = req.decodedToken;
    if (decodedToken.role !== "CANDIDATE") {
      appLogger.info("Forbidden Access Attempt");
      dbLogger.info("Forbidden Access Attempt");
      return res.status(403).json({ message: "Forbidden: Access is denied" });
    }
    next();
    return;
  } catch (error) {
    appLogger.error("Authorization Error:", error);
    dbLogger.error("Authorization Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      appLogger.info("Forbidden Access Attempt");
      dbLogger.info("Forbidden Access Attempt");
      return res.status(403).json({ message: "Forbidden: Access is denied" });
    }
    next();
  };
};

export const authorizeSelfOrAdmin = (req, res, next) => {
  if (
    req.user.role === "ADMIN" ||
    (req.user._id === req.params.id && validToken)
  ) {
    return next();
  }
  appLogger.info("Forbidden Access Attempt");
  dbLogger.info("Forbidden Access Attempt");
  return res.status(403).json({ message: "Forbidden: Access is denied" });
};
