import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useFormContext, useFieldArray } from "react-hook-form";

export default function ContactDetails() {
  const { register, control, formState: { errors } } = useFormContext();

  const {fields, append, remove} = useFieldArray({
    name:"phone",
    control,
  })

  return (
    <div className="space-y-4">
      <h3 className="text-center border-b-1 text-xl pb-2">Contact Information</h3>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && <p className="text-red-500">{errors.email.message?.toString()}</p>}
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Input id="address" {...register("address")} />
        {errors.address && <p className="text-red-500">{errors.address.message?.toString()}</p>}
      </div>

      <div className="space-y-4">
        <Label>Phone Numbers</Label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-center">
            <Input
              {...register(`phone.${index}.number`)}
              placeholder={`Phone #${index + 1}`}
              id={`phone-${index}`}
            />
            <button
              type="button"
              className="text-sm px-2 py-1 rounded bg-red-600 text-white hover:bg-red-500 cursor-pointer"
              onClick={() => remove(index)}
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ number: "" })}
          className="mt-2 px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-500 cursor-pointer"
        >
          + Add Phone
        </button>

        {errors.phone && <p className="text-red-500">{errors.phone.message?.toString()}</p>}
      </div>

    </div>
  );
}