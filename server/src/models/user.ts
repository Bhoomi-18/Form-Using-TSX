import mongoose from "mongoose";

const phoneSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 15,
    match: /^[0-9]+$/,
  },
});

const parentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
  },
  contact: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 15,
    match: /^[0-9]+$/,
  },
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 4,
  },
  dob: {
    type: String,
    required: true,
    validate: {
      validator: (val: string) => !isNaN(Date.parse(val)),
      message: "Invalid date format",
    },
  },
  gender: {
    type: String,
    required: true,
    enum: ["M", "F", "m", "f"],
  },
  nation: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  address: {
    type: String,
    required: true,
    minlength: 5,
  },
  phone: {
    type: [phoneSchema],
    validate: [(val: any[]) => val.length > 0, "At least one phone number is required"],
  },
  parentInfo: {
    type: [parentSchema],
    validate: [(val: any[]) => val.length > 0, "At least one parent contact is required"],
  },
  year: {
    type: String,
    required: true,
    match: /^[0-9]{4}$/,
  },
  course: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  pre: {
    type: String,
    required: true,
  },
  photo: { type: String, required: true },
  proof: { type: String, required: true },
  marks: { type: String, required: true },
  sign: { type: String, required: true },
  terms: {
    type: Boolean,
    required: true,
    validate: {
      validator: (val: boolean) => val === true,
      message: "Terms must be accepted",
    },
  },
});

export const User = mongoose.model("User", userSchema);