import { useFormContext } from "react-hook-form";
import { Label } from "../../components/ui/label";

export default function Declaration() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <h3 className="text-center border-b-1 text-xl pb-2">Declaration</h3>
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="terms"
          {...register("terms", {
            required: "You must agree before submitting",
          })}
        />
        <Label htmlFor="terms" className="text-sm">
          I hereby declare that the information provided is accurate to the best of my knowledge.
        </Label>
      </div>
      {errors.terms && (
        <p className="text-red-500 text-sm">
          {errors.terms.message?.toString()}
        </p>
      )}
    </div>
  );
}