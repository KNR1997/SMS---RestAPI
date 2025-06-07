import { useForm } from "react-hook-form";
import Label from "../form/Label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../ui/button/Button";
import { Course, Student, User } from "../../types";
import {
  useStudentEnrollCourseMutation,
  useStudentsQuery,
} from "../../data/student";
import SelectInput from "../ui/select-input";
import { useCoursesQuery } from "../../data/course";
import Input from "../form/input/InputField";

type FormValues = {
  student: User;
  admission: string;
  courses: Course[];
  totalPayment: string;
};

const defaultValues = {
  admission: "2000",
  totalPayment: "4000",
};

const validationSchema = yup.object().shape({
  student: yup.object().required("Student is required"),
});

interface Props {
  initialValues?: Student;
}

export default function StudentEnrollForm({ initialValues }: Props) {
  const { students } = useStudentsQuery({});

  const {
    control,
    register,
    watch,
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

  const selectedStudent = watch("student");
  const studentGrade = selectedStudent?.grade;

  const { courses } = useCoursesQuery({
    grade: studentGrade,
  });

  const { mutate: enrollStudent, isLoading: creating } =
    useStudentEnrollCourseMutation();

  const onSubmit = async (values: FormValues) => {
    const input = {
      courses: values.courses.map((course) => course.id),
    };

    enrollStudent({ studentId: values.student.id, input });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div>
          <Label>
            Student <span className="text-error-500">*</span>
          </Label>
          <SelectInput
            name="student"
            control={control}
            getOptionLabel={(option: any) => option.firstName}
            getOptionValue={(option: any) => option.id}
            options={students}
            isClearable={true}
          />
          {errors.student && (
            <p className="text-error-500 text-sm mt-1">
              {errors.student.message}
            </p>
          )}
        </div>
        <div>
          <Label>
            Admission <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            {...register("admission")}
            errorMessage={errors.admission?.message!}
            disabled
          />
        </div>
        <div>
          <Label>
            Courses <span className="text-error-500">*</span>
          </Label>
          <SelectInput
            name="courses"
            control={control}
            getOptionLabel={(option: any) => option.name}
            getOptionValue={(option: any) => option.id}
            options={courses}
            isClearable={true}
            isMulti
          />
          {errors.courses && (
            <p className="text-error-500 text-sm mt-1">
              {errors.courses.message}
            </p>
          )}
        </div>
        {/* <div>
          <Label>
            More Courses
          </Label>
          <SelectInput
            name="courses"
            control={control}
            getOptionLabel={(option: any) => option.name}
            getOptionValue={(option: any) => option.id}
            options={courses}
            isClearable={true}
            isMulti
          />
          {errors.courses && (
            <p className="text-error-500 text-sm mt-1">
              {errors.courses.message}
            </p>
          )}
        </div> */}
        <div>
          <Label>
            Total Payment <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            {...register("totalPayment")}
            errorMessage={errors.totalPayment?.message!}
            disabled
          />
        </div>
        <Button disabled={creating} size="sm">
          Enroll Student
        </Button>
      </div>
    </form>
  );
}
