import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";

interface EditFormProps {
  register: ReturnType<typeof useForm>["register"];
  control: ReturnType<typeof useForm>["control"];
  isUpdating: boolean;
}

export default function EditForm({ register, control, isUpdating }: EditFormProps) {
  const { fields: phoneFields, append: addPhone, remove: removePhone } = useFieldArray({
    control,
    name: "phone",
  });
  const { fields: parentFields, append: addParent, remove: removeParent } = useFieldArray({
    control,
    name: "parentInfo",
  });

  return(
    <div className="grid grid-cols-2 gap-6 text-base">
      <div>
        <label>First Name</label>
        <Input {...register("firstName")} />
      </div>
      <div>
        <label>Last Name</label>
        <Input {...register("lastName")} />
      </div>
      <div>
        <label>Email</label>
        <Input {...register("email")} />
      </div>
      <div>
        <label>Address</label>
        <Input {...register("address")} />
      </div>
      <div>
        <label>Course</label>
        <Input {...register("course")} />
      </div>
      <div>
        <label>Grade</label>
        <Input {...register("grade")} />
      </div>
      <div>
        <label>Previous School</label>
        <Input {...register("pre")} />
      </div>
      <div>
        <label>Date of Birth</label>
        <Input type="date" {...register("dob")} />
      </div>

      <div className="col-span-2 space-y-2">
        <label className="block font-semibold">Phone Numbers</label>
        {phoneFields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <Input {...register(`phone.${index}.number`)} placeholder="Phone number" />
            <Button type="button" variant="destructive" onClick={() => removePhone(index)}>Remove</Button>
          </div>
        ))}
        <Button type="button" onClick={() => addPhone({ number: "" })}>Add Phone</Button>
      </div>

      <div className="col-span-2 space-y-2">
        <label className="block font-semibold">Parent Information</label>
        {parentFields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-2 gap-2">
            <Input {...register(`parentInfo.${index}.name`)} placeholder="Parent name" />
            <Input {...register(`parentInfo.${index}.contact`)} placeholder="Contact number" />
            <Button type="button" variant="destructive" onClick={() => removeParent(index)}>Remove</Button>
          </div>
        ))}
        <Button type="button" variant="default" onClick={() => addParent({ name: "", contact: "" })}>Add Parent</Button>
      </div>

      <div>
        <label>ID Proof</label>
        <Input type="file" {...register("proof")} />
      </div>

      <div>
        <label>Photo</label>
        <Input type="file" {...register("photo")} />
      </div>

      <div>
        <label>Marksheet (latest)</label>
        <Input type="file" {...register("marks")} />
      </div>

      <div>
        <label>Signature</label>
        <Input type="file" {...register("sign")} />
      </div>

      <div className="col-span-2">
        <Button type="submit" variant= "success" disabled={isUpdating}>
          {isUpdating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </div>
  );
}