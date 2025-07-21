import express from "express";
import { upload } from "../middelware/upload";
import { registerUser } from "../controllers/registerUser";
import { loginUser } from "../controllers/loginUser";
import { getUserById } from "../controllers/getUserById";
import { updateUserById } from "../controllers/updateUser";

const router = express.Router();

router.post("/user", upload.fields([
  { name: "photo", maxCount: 1 },
  { name: "proof", maxCount: 1 },
  { name: "marks", maxCount: 1 },
  { name: "sign", maxCount: 1 },
]), registerUser);

router.post("/login", loginUser);
router.get("/user/:id", getUserById);
router.put("/user/:id", updateUserById);


// router.get("/user", async (_req, res) => {
//   try {
//     const users = await User.find({}, "-__v -password");
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch users" });
//   }
// });

export default router;