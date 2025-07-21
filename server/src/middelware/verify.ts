import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    if (decoded.email !== "bhoomi@admin.com") {
      return res.status(403).json({ message: "Access denied: not an admin" });
    }

    (req as any).user = decoded; 
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};