import { useForm } from "react-hook-form";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../ui/button/Button";
import { Subject } from "../../types";
import { formatSlug } from "../../utils/use-slug";
import {
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
} from "../../data/subject";

type FormValues = {
  name: string;
  slug: string;
  code: string;
  courses: any;
};

const defaultValues = {
  name: "",
  slug: "",
  code: "",
};

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  // code: yup.string().required("Code is required"),
});

interface Props {
  initialValues?: Subject;
}

// function SelectCourse({
//   control,
//   errors,
// }: {
//   control: Control<FormValues>;
//   errors: FieldErrors;
// }) {
//   const { courses = [], loading } = useCoursesQuery({
//     limit: 999,
//   });

//   return (
//     <div className="mb-5">
//       <Label>Course</Label>
//       <SelectInput
//         name="courses"
//         control={control}
//         getOptionLabel={(option: any) => option.name}
//         getOptionValue={(option: any) => option.id}
//         options={courses}
//         isLoading={loading}
//       />
//       {/* <ValidationError message={t(errors.course?.message)} /> */}
//     </div>
//   );
// }

export default function CreateOrUpdateSubjectForm({ initialValues }: Props) {
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

  // console.log('initialValues: ', initialValues)

  const { mutate: createSubject, isLoading: creating } =
    useCreateSubjectMutation();
  const { mutate: updateSubject, isLoading: updating } =
    useUpdateSubjectMutation();

  const name = watch("name");
  const formattedSlug = formatSlug(name);

  const onSubmit = async (values: FormValues) => {
    const input = {
      name: values.name,
      slug: formattedSlug,
      code: formattedSlug,
      // courseId: values.courses.id,
    };

    if (!initialValues) {
      createSubject(input);
    } else {
      updateSubject({ id: initialValues.id, ...input });
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
            value={formattedSlug}
            errorMessage={errors.code?.message!}
            disabled
          />
        </div>
        {/* <SelectCourse control={control} errors={errors} /> */}

        <Button disabled={creating || updating} size="sm">
          {initialValues ? "Update" : "Create"} Subject
        </Button>
      </div>
    </form>
  );
}
