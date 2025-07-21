import { useForm } from "react-hook-form";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onLogin = handleSubmit(async (data) => {
  setError("");
  setIsLoading(true);

  try {
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message);

    sessionStorage.setItem("token", result.token);
    sessionStorage.setItem("userId", result.userId);

    navigate("/profile");
  } catch (err: any) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
});

  return (
    <form
      onSubmit={onLogin}
      className="max-w-md w-full bg-black text-white shadow-lg rounded-lg p-8 mx-auto space-y-6"
    >
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register("email", { required: "Email is required" })} />
        {errors.email?.message && (<p className="text-red-500 text-sm">{`${errors.email.message}`}</p>)}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register("password", { required: "Password is required" })} />
        {errors.password?.message && (<p className="text-red-500 text-sm">{`${errors.password.message}`}</p>)}
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </Button>


      {error && <p className="text-red-500 mt-4">{error}</p>}
    </form>
  );
}