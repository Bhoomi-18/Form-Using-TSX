import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useFormContext, useFieldArray } from "react-hook-form";

export default function ParentInfo() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: "parentInfo",
    control,
  });

  
  return (
    <div className="space-y-4">
      <h3 className="text-center border-b-1 text-xl pb-2">Parent Information</h3>

      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-2 gap-4 items-center">
          <div>
            <Label htmlFor={`parentInfo-${index}-name`}>Name</Label>
            <Input
              id={`parentInfo-${index}-name`}
              {...register(`parentInfo.${index}.name`)}
              placeholder="Parent Name"
            />
            {Array.isArray(errors.parentInfo) &&
              errors.parentInfo[index]?.name?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.parentInfo[index].name.message}
                </p>
            )}

          </div>

          <div>
            <Label htmlFor={`parentInfo-${index}-contact`}>Contact No</Label>
            <Input
              id={`parentInfo-${index}-contact`}
              {...register(`parentInfo.${index}.contact`)}
              placeholder="Contact Number"
            />
            {Array.isArray(errors.parentInfo) &&
              errors.parentInfo[index]?.contact?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.parentInfo[index].contact.message}
                </p>
            )}

          </div>

          <button
            type="button"
            className="col-span-2 bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-500 mt-2 cursor-pointer"
            onClick={() => remove(index)}
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ name: "", contact: "" })}
        className="bg-green-600 text-white text-sm px-4 py-2 rounded hover:bg-green-500 cursor-pointer"
      >
        + Add Parent
      </button>

      {typeof errors.parentInfo === "object" && !Array.isArray(errors.parentInfo) && (
        <p className="text-red-500">{errors.parentInfo?.message?.toString()}</p>
      )}
    </div>
  );
}