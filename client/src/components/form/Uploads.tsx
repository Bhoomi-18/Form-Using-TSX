import { useFormContext } from "react-hook-form";
import { Label } from "../../components/ui/label";

export default function Uploads() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6">
      <h3 className="text-center border-b-1 text-xl pb-2">Upload Documents</h3>
      <div>
        <Label htmlFor="photo">Upload Photo</Label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          {...register("photo", { required: "Photo is required" })}
        />
        {errors.photo && (
          <p className="text-red-500 text-sm mt-1">
            {errors.photo.message?.toString()}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="proof">Identity Proof</Label>
        <input
          id="proof"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          {...register("proof", { required: "Proof document is required" })}
        />
        {errors.proof && (
          <p className="text-red-500 text-sm mt-1">
            {errors.proof.message?.toString()}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="marks">Academic Marksheet</Label>
        <input
          id="marks"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          {...register("marks", { required: "Marksheet is required" })}
        />
        {errors.marks && (
          <p className="text-red-500 text-sm mt-1">
            {errors.marks.message?.toString()}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="sign">Signature</Label>
        <input
          id="sign"
          type="file"
          accept="image/*"
          {...register("sign", { required: "Signature is required" })}
        />
        {errors.sign && (
          <p className="text-red-500 text-sm mt-1">
            {errors.sign.message?.toString()}
          </p>
        )}
      </div>
    </div>
  );
}