import { useForm } from "react-hook-form";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../ui/button/Button";
import { Course, EGrade, Subject, User } from "../../types";
import {
  useCreateCourseMutation,
  useUpdateCourseMutation,
} from "../../data/course";
import { formatSlug } from "../../utils/use-slug";
import { gradeOptions } from "../../constants/role";
import { useSubjectsQuery } from "../../data/subject";
import { useUsersQuery } from "../../data/user";
import SelectInput from "../ui/select-input";

type FormValues = {
  name: string;
  slug: string;
  code: string;
  grade: {label: EGrade, value: string};
  subject: Subject;
  teacher: User;
};

const defaultValues = {
  name: "",
  slug: "",
  code: "",
  // grade: "",
};

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  code: yup.string().required("Code is required"),
  grade: yup.object().required("Grade is required"),
  subject: yup.object().required("Subject is required"),
  teacher: yup.object().required("Teacher is required"),
});

interface Props {
  initialValues?: Course;
}

export default function CreateOrUpdateCourseForm({ initialValues }: Props) {
  const { subjects } = useSubjectsQuery({});
  const { users } = useUsersQuery({});

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
          grade: initialValues?.grade
            ? gradeOptions.find((grade) => grade.value === initialValues.grade)
            : null,
          subject: initialValues?.subjectId
            ? subjects.find((subject) => subject.id === initialValues.subjectId)
            : null,
          teacher: initialValues?.teacherId
            ? users.find((user) => user.id === initialValues.teacherId)
            : null,
        }
      : defaultValues,
    //@ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const { mutate: createCourse, isLoading: creating } =
    useCreateCourseMutation();
  const { mutate: updateCourse, isLoading: updating } =
    useUpdateCourseMutation();

  // if (creating || updating) return <Loader text="Loading..." />;

  const name = watch("name");
  const formattedSlug = formatSlug(name);

  const onSubmit = async (values: FormValues) => {
    const input = {
      name: values.name,
      slug: formattedSlug,
      code: values.code,
      grade: values.grade.value,
      subjectId: values.subject.id,
      teacherId: values.teacher.id,
    };

    // console.log("input: ", input);

    if (!initialValues) {
      createCourse(input);
    } else {
      updateCourse({ id: initialValues.id, ...input });
    }
  };

  // console.log("intitial: ", initialValues);

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
          <SelectInput
            name="grade"
            control={control}
            options={gradeOptions}
            isClearable={true}
          />
          {errors.grade && (
            <p className="text-error-500 text-sm mt-1">
              {errors.grade.message}
            </p>
          )}
        </div>
        <div>
          <Label>
            Subject <span className="text-error-500">*</span>
          </Label>
          <SelectInput
            name="subject"
            control={control}
            getOptionLabel={(option: any) => option.name}
            getOptionValue={(option: any) => option.id}
            options={subjects}
            isClearable={true}
          />
          {errors.subject && (
            <p className="text-error-500 text-sm mt-1">
              {errors.subject.message}
            </p>
          )}
        </div>
        <div>
          <Label>
            Teacher <span className="text-error-500">*</span>
          </Label>
          <SelectInput
            name="teacher"
            control={control}
            getOptionLabel={(option: any) => option.firstName}
            getOptionValue={(option: any) => option.id}
            options={users}
            isClearable={true}
          />
          {errors.teacher && (
            <p className="text-error-500 text-sm mt-1">
              {errors.teacher.message}
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
