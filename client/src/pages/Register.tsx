import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../lib/schema/formSchema";
import PersonalInfo from "../components/form/PersonalInfo";
import ContactDetails from "../components/form/ContactDetails";
import ParentInfo from "../components/form/ParentInfo";
import AcademicDetails from "../components/form/AcademicDetails";
import Uploads from "../components/form/Uploads";
import Declaration from "../components/form/Declaration";
import StepNavigation from "../components/sections/StepNavigation";
import { useState } from "react";
import LoginForm from "./Login";
import { registerUser } from "../lib/api/registerUser";

export default function Register() {
  const methods = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      dob: "",
      gender: undefined,
      nation: "",
      password: "",
      phone: [{ number: "" }],
      email: "",
      address: "",
      parentInfo: [{ name: "", contact: "" }],
      year: "",
      course: "",
      grade: "",
      pre: "",
      terms: true,
    },
  });

  const steps = [
    <PersonalInfo key={0} />,
    <ContactDetails key={1} />,
    <ParentInfo key={2} />,
    <AcademicDetails key={3} />,
    <Uploads key={4} />,
    <Declaration key={5} />,
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [viewMode, setViewMode] = useState<"register" | "login">("register");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = methods.handleSubmit(async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const result = await registerUser(data);
      console.log("Registered:", result);
      alert("Registration successful!");
      methods.reset();
      setCurrentStep(0);
    } catch (err: any) {
      console.error("Registration error:", err.message);
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <FormProvider {...methods}>
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setViewMode("register")}
          className={`px-4 py-2 rounded cursor-pointer ${
            viewMode === "register" ? "bg-black text-white" : "bg-gray-300 text-black"
          }`}
        >
          Register
        </button>
        <button
          onClick={() => setViewMode("login")}
          className={`px-4 py-2 rounded cursor-pointer ${
            viewMode === "login" ? "bg-black text-white" : "bg-gray-300 text-black"
          }`}
        >
          Login
        </button>
      </div>

      {viewMode === "register" ? (
        <form
          onSubmit={onSubmit} onKeyDown={(e) => {if (e.key === "Enter") e.preventDefault();}}
          className="max-w-2xl w-full bg-black text-white shadow-lg rounded-lg p-8 mx-auto space-y-6"
        >
          {steps[currentStep]}
          <StepNavigation
            currentStep={currentStep}
            totalSteps={steps.length}
            onNext={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
            onBack={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            isSubmitting={isSubmitting}
          />
        </form>
      ) : (
        <LoginForm />
      )}
    </FormProvider>
  );
}