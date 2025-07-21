import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import { upload } from "../middelware/upload";
import jwt from "jsonwebtoken";
import { verifyAdmin } from "../middelware/verify";


const router = express.Router();

router.post("/user", upload.fields([
  { name: "photo", maxCount: 1 },
  { name: "proof", maxCount: 1 },
  { name: "marks", maxCount: 1 },
  { name: "sign", maxCount: 1 },
]), async (req, res) => {
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
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "No user found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "1d" });

  res.status(200).json({ message: "Login successful", token, userId: user._id });
});


// router.get("/user", async (_req, res) => {
//   try {
//     const users = await User.find({}, "-__v -password");
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch users" });
//   }
// });

router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password -terms -__v");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
});


// router.put("/user/:id", upload.fields([
//   { name: "photo", maxCount: 1 },
//   { name: "proof", maxCount: 1 },
//   { name: "marks", maxCount: 1 },
//   { name: "sign", maxCount: 1 },
// ]), async (req, res) => {
//   try {
//     const body = req.body;
//     const files = req.files as { [key: string]: Express.Multer.File[] };

//     const updateData: any = {
//       ...body,
//       dob: new Date(body.dob),
//       phone: JSON.parse(body.phone),
//       parentInfo: JSON.parse(body.parentInfo),
//       terms: body.terms === "true",
//     };

//     const fields = ["photo", "proof", "marks", "sign"];
//     for (const field of fields) {
//       const file = files?.[field]?.[0];
//       if (file) updateData[field] = file.path;
//     }

//     const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
//     res.send("User updated successfully");
//   } catch (err) {
//     res.status(500).send("Error updating user");
//   }
// });

router.put("/user/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser); // ✅ return valid JSON
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Error updating user" }); // ✅ not a plain string
  }
});

router.get("/users", verifyAdmin, async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});


// router.delete("/user/:id", async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) return res.status(404).send("User not found");
//     res.send("User deleted successfully");
//   } catch (err) {
//     res.status(500).send("Error deleting user");
//   }
// });

export default router;