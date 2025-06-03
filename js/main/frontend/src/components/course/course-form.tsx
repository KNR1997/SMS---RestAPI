import { Controller, useForm } from "react-hook-form";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../ui/button/Button";
import { Course, EGrade } from "../../types";
import {
  useCreateCourseMutation,
  useUpdateCourseMutation,
} from "../../data/course";
import { formatSlug } from "../../utils/use-slug";
import SelectInput from "../form/select-input";
import { gradeOptions } from "../../constants/role";

type FormValues = {
  name: string;
  slug: string;
  code: string;
  grade: EGrade;
};

const defaultValues = {
  name: "",
  slug: "",
  code: "",
  grade: "",
};

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  code: yup.string().required("Code is required"),
  grade: yup.string().required("Grade is required"),
});

interface Props {
  initialValues?: Course;
}

export default function CreateOrUpdateCourseForm({ initialValues }: Props) {
  const {
    control,
    register,
    handleSubmit,
    watch,
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

  const { mutate: createCourse, isLoading: creating } =
    useCreateCourseMutation();
  const { mutate: updateCourse, isLoading: updating } =
    useUpdateCourseMutation();

  const name = watch("name");
  const formattedSlug = formatSlug(name);

  const onSubmit = async (values: FormValues) => {
    const input = {
      name: values.name,
      slug: formattedSlug,
      code: values.code,
      grade: values.grade,
    };

    if (!initialValues) {
      createCourse(input);
    } else {
      updateCourse({ id: initialValues.id, ...input });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div>
          <Label>
            Name <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            placeholder="John"
            {...register("name")}
            errorMessage={errors.name?.message!}
          />
        </div>
        {/* <div>
          <Label>
            Slug <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            disabled
            placeholder="John"
            {...register("slug")}
            errorMessage={errors.slug?.message!}
          />
        </div> */}
        <div>
          <Label>
            Code <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            placeholder="Doe"
            {...register("code")}
            errorMessage={errors.code?.message!}
          />
        </div>
        <div>
          <Label>
            Grade <span className="text-error-500">*</span>
          </Label>
          <Controller
            name="grade"
            control={control}
            rules={{ required: "Grade is required" }}
            render={({ field }) => (
              <SelectInput
                options={gradeOptions}
                placeholder="Select Option"
                value={field.value}
                onChange={field.onChange}
                className="dark:bg-dark-900"
              />
            )}
          />
          {errors.grade && (
            <p className="text-error-500 text-sm mt-1">
              {errors.grade.message}
            </p>
          )}
        </div>
        <Button disabled={creating || updating} size="sm">
          {initialValues ? "Update" : "Create"} Course
        </Button>
      </div>
    </form>
  );
}
