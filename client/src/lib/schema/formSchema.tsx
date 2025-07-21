import { z } from "zod";

const KB =1024;
const MAX_FILE_SIZE = {
  photo: 50*KB,
  sign: 50*KB,
  proof: 100*KB,
  marks: 100*KB,
};

const ACCEPTED_IMAGE_TYPES= ["imagejpeg", "image/jpg", "image/png"];

const fileSchema = (maxSize: number) =>
  z
    .any()
    .refine(file => file?.[0], "File is required")
    .refine(file => file?.[0]?.size <= maxSize, `Max file size is ${maxSize/KB} KB`)
    .refine(file => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type), "Only .jpg pr .png formats are accepted");

const phoneSchema = z.object({
  number: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number can't be longer than 15 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only digits"),
});

const parentSchema = z.object({
  name: z.string().min(1, "Parent name is required"),
  contact: z.string().min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number can't be longer than 15 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only digits"),

})

export const formSchema = z.object({
  firstName: z.string().min(3, "Required (min 3 letters)"),
  lastName: z.string().min(4, "Required (min 4 letters)"),
  dob: z.string().refine(val => !isNaN(Date.parse(val)), "Enter a valid date"),
  gender: z.enum(["M", "F", "m", "f"]),
  nation: z.string().min(1, "Required"),
  password: z.string().min(6, "Password must be at least 6 characters"),

  phone: z.array(phoneSchema).nonempty("At least one phone number is required"),
  email: z.string().email("Enter a valid email address!"),
  address: z.string().min(5, "Address is required (min 5 letters)"),

  parentInfo: z.array(parentSchema).nonempty("At least one parent contact is required"),

  year: z.string().length(4, "Must be 4 digits").regex(/^[0-9]+$/, "Invalid Year"),
  course: z.string().min(1, "Required"),
  grade: z.string().min(1, "Required"),
  pre: z.string().min(1, "Required"),

  photo: fileSchema(MAX_FILE_SIZE.photo),
  proof: fileSchema(MAX_FILE_SIZE.proof),
  marks: fileSchema(MAX_FILE_SIZE.marks),
  sign: fileSchema(MAX_FILE_SIZE.sign),

  terms: z.literal(true, {
    message: "You must accept the terms and conditions" 
  }),
});