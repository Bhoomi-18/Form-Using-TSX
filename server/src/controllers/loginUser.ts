import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "No user found" });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
  
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "1d" });
  
    res.status(200).json({ message: "Login successful", token, userId: user._id });
};
