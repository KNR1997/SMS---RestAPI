import { useForm } from "react-hook-form";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../ui/button/Button";
import { Course, EGrade, ERole, Subject, User } from "../../types";
import {
  useCreateCourseMutation,
  useUpdateCourseMutation,
} from "../../data/course";
import { gradeOptions } from "../../constants/role";
import { useSubjectsQuery } from "../../data/subject";
import { useUsersQuery } from "../../data/user";
import SelectInput from "../ui/select-input";
import {
  generateCourseCode,
  generateCourseName,
} from "../../utils/use-code-generate";

type FormValues = {
  name: string;
  slug: string;
  code: string;
  gradeType: { label: string; value: EGrade };
  subject: Subject;
  teacher: User;
  batch: number;
  fee: number;
  description: string;
};

const defaultValues = {
  name: "",
  slug: "",
  code: "",
  // gradeType: "",
  batch: 1,
  description: "",
};

const validationSchema = yup.object().shape({
  // name: yup.string().required("Name is required"),
  // code: yup.string().required("Code is required"),
  gradeType: yup.object().required("Grade is required"),
  subject: yup.object().required("Subject is required"),
  teacher: yup.object().required("Teacher is required"),
});

interface Props {
  initialValues?: Course;
  isEditable: boolean;
}

export default function CreateOrUpdateCourseForm({
  initialValues,
  isEditable = false,
}: Props) {
  const { subjects } = useSubjectsQuery({});
  const { users } = useUsersQuery({
    role: ERole.ROLE_TEACHER,
  });

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
          gradeType: initialValues?.gradeType
            ? gradeOptions.find(
                (gradeType) => gradeType.value === initialValues.gradeType
              )
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

  const gradeType = watch("gradeType");
  const subject = watch("subject");
  const teacher = watch("teacher");
  const batch = watch("batch");

  // const formattedSlug = formatSlug(name);
  const courseName = generateCourseName(
    gradeType?.value,
    subject?.name,
    teacher?.firstName,
    teacher?.lastName,
    batch
  );
  const courseCode = generateCourseCode(
    gradeType?.value,
    subject?.code,
    teacher?.firstName,
    teacher?.lastName,
    batch
  );

  const onSubmit = async (values: FormValues) => {
    const input = {
      name: courseName,
      slug: courseName,
      code: courseCode,
      gradeType: values.gradeType.value,
      subjectId: values.subject.id,
      teacherId: values.teacher.id,
      batch: values.batch,
      fee: values.fee,
      description: values.description,
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
            Grade <span className="text-error-500">*</span>
          </Label>
          <SelectInput
            disabled={!isEditable}
            name="gradeType"
            control={control}
            options={gradeOptions}
            isClearable={true}
          />
          {errors.gradeType && (
            <p className="text-error-500 text-sm mt-1">
              {errors.gradeType.message}
            </p>
          )}
        </div>
        <div>
          <Label>
            Subject <span className="text-error-500">*</span>
          </Label>
          <SelectInput
            disabled={!isEditable}
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
            disabled={!isEditable}
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
        <div>
          <Label>
            Batch <span className="text-error-500">*</span>
          </Label>
          <Input
            disabled={!isEditable}
            type="number"
            {...register("batch")}
            errorMessage={errors.batch?.message!}
          />
        </div>
        <div>
          <Label>
            Fee <span className="text-error-500">*</span>
          </Label>
          <Input
            disabled={!isEditable}
            type="number"
            {...register("fee")}
            errorMessage={errors.fee?.message!}
          />
        </div>
        <div>
          <Label>
            Name <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            // placeholder="John"
            value={courseName}
            {...register("name")}
            errorMessage={errors.name?.message!}
            disabled
          />
        </div>
        <div>
          <Label>
            Code <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            // placeholder="Doe"
            value={courseCode}
            {...register("code")}
            errorMessage={errors.code?.message!}
            disabled
          />
        </div>
        <div>
          <Label>
            Description <span className="text-error-500"></span>{" "}
          </Label>
          <Input
            // placeholder="Doe"
            {...register("description")}
            errorMessage={errors.description?.message!}
          />
        </div>
        {isEditable && (
          <Button disabled={creating || updating} size="sm">
            {initialValues ? "Update" : "Create"} Course
          </Button>
        )}
      </div>
    </form>
  );
}
