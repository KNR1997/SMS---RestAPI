import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Course, Hall } from "@types";
import Label from "@components/ui/label";
import Button from "@components/ui/button/Button";
import { useCreateExamMutation, useUpdateExamMutation } from "@data/exam";
import SelectInput from "@components/ui/select-input";
import { useCoursesQuery } from "@data/course";

type FormValues = {
  course: Course;
};

const defaultValues = {};

const validationSchema = yup.object().shape({
  course: yup.object().required("Course is required"),
});

interface Props {
  initialValues?: Hall;
}

export default function CreateOrUpdateExamForm({ initialValues }: Props) {
  const { courses } = useCoursesQuery({});

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    // @ts-ignore
    defaultValues: initialValues
      ? {
          ...initialValues,
        }
      : defaultValues,
    //@ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const { mutate: createExam, isLoading: creating } = useCreateExamMutation();
  const { mutate: updateExam, isLoading: updating } = useUpdateExamMutation();

  const onSubmit = async (values: FormValues) => {
    const input = {
      courseId: values.course.id,
    };

    if (!initialValues) {
      createExam(input);
    } else {
      updateExam({ id: initialValues.id, ...input });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div>
          <Label>
            Course <span className="text-error-500">*</span>
          </Label>
          <SelectInput
            name="course"
            control={control}
            getOptionLabel={(option: any) => option.name}
            getOptionValue={(option: any) => option.id}
            options={courses}
            isClearable={true}
          />
          {errors.course && (
            <p className="text-error-500 text-sm mt-1">
              {errors.course.message}
            </p>
          )}
        </div>

        <Button disabled={creating || updating} size="sm">
          {initialValues ? "Update" : "Create"} Exam
        </Button>
      </div>
    </form>
  );
}
