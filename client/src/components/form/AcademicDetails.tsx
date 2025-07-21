import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useFormContext } from "react-hook-form";

export default function AcademicDetails() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <h3 className="text-center border-b-1 text-xl pb-2">Academic Details</h3>
      <div>
        <Label htmlFor="year">Passing Year</Label>
        <Input id="year" {...register("year")} />
        {errors.year && <p className="text-red-500">{errors.year.message?.toString()}</p>}
      </div>

      <div>
        <Label htmlFor="course">Course</Label>
        <Input id="course" {...register("course")} />
        {errors.course && <p className="text-red-500">{errors.course.message?.toString()}</p>}
      </div>

      <div>
        <Label htmlFor="grade">Grade</Label>
        <Input id="grade" {...register("grade")} />
        {errors.grade && <p className="text-red-500">{errors.grade.message?.toString()}</p>}
      </div>

      <div>
        <Label htmlFor="pre">Previous Qualification</Label>
        <Input id="pre" {...register("pre")} />
        {errors.pre && <p className="text-red-500">{errors.pre.message?.toString()}</p>}
      </div>
    </div>
  );
}