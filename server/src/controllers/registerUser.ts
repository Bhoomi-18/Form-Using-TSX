import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const files = req.files as { [key: string]: Express.Multer.File[] };

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = new User({
      ...body,
      dob: new Date(body.dob),
      password: hashedPassword,
      phone: JSON.parse(body.phone),
      parentInfo: JSON.parse(body.parentInfo),
      photo: files.photo?.[0]?.path,
      proof: files.proof?.[0]?.path,
      marks: files.marks?.[0]?.path,
      sign: files.sign?.[0]?.path,
      terms: body.terms === "true",
    });

    await newUser.save();
    res.send("User registered successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send("Error saving user");
  }
};