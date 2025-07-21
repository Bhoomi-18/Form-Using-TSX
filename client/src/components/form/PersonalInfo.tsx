import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useFormContext } from "react-hook-form";

export default function PersonalInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <h3 className="text-center border-b-1 text-xl pb-2">Personal Information</h3>
      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input id="firstName" {...register("firstName")} />
        {errors.firstName && (
          <p className="text-red-500 text-sm mt-1">{errors.firstName?.message?.toString()}</p>
        )}
      </div>

      <div>
        <Label htmlFor="lastName">Last Name</Label>
        <Input id="lastName" {...register("lastName")} />
        {errors.lastName && (
          <p className="text-red-500 text-sm mt-1">{errors.lastName?.message?.toString()}</p>
        )}
      </div>

      <div>
        <Label htmlFor="dob">Date of Birth</Label>
        <Input id="dob" type="date" {...register("dob")} />
        {errors.dob && (
          <p className="text-red-500 text-sm mt-1">{errors.dob?.message?.toString()}</p>
        )}
      </div>

      <div>
        <Label htmlFor="gender">Gender (M/F)</Label>
        <Input id="gender" placeholder="M or F" {...register("gender")} />
        {errors.gender && (
          <p className="text-red-500 text-sm mt-1">{errors.gender?.message?.toString()}</p>
        )}
      </div>

      <div>
        <Label htmlFor="nation">Nationality</Label>
        <Input id="nation" type="text" {...register("nation")} />
        {errors.nation && (
          <p className="text-red-500 text-sm mt-1">{errors.nation?.message?.toString()}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password"
          {...register("password")} placeholder="Enter password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1"> {errors.password.message?.toString()}</p>
        )}
      </div>
    </div>
  );
}