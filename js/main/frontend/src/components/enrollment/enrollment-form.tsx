import { useForm } from "react-hook-form";
import Label from "@components/form/Label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@components/ui/button/Button";
import { Course, PaymentMethod, Student } from "@types";
import {
  useStudentEnrolledCoursesQuery,
  useStudentsQuery,
} from "@data/student";
import SelectInput from "@components/ui/select-input";
import { useCoursesQuery } from "@data/course";
import Input from "@components/form/input/InputField";
import { useEffect } from "react";
import { useStudentEnrollCourseMutation } from "@data/student-enrollment";

type FormValues = {
  student: Student;
  admission: number;
  courses: Course[];
  totalPayment: number;
};

const defaultValues = {
  admission: 2000,
  totalPayment: 0,
};

const validationSchema = yup.object().shape({
  student: yup.object().required("Student is required"),
  courses: yup.array().required("Course is required")
});

interface Props {
  initialValues?: Student;
}

export default function EnrollForm({ initialValues }: Props) {
  const { students } = useStudentsQuery({});

  const {
    control,
    register,
    watch,
    setValue,
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

  const watchedCourses = watch("courses");
  const admission = watch("admission");

  useEffect(() => {
    const coursesTotal = (watchedCourses || []).reduce(
      (sum, course) => sum + (course?.fee || 0),
      0
    );
    setValue("totalPayment", admission + coursesTotal);
  }, [watchedCourses, admission, setValue]);

  const selectedStudent = watch("student");
  const studentGradeType = selectedStudent?.gradeType;

  // Get selected student's already enrolled courses
  const { courses: alreadyEnrolledCourses } = useStudentEnrolledCoursesQuery({
    studentId: selectedStudent?.id,
  });

  useEffect(() => {
    if (selectedStudent && selectedStudent?.admissionPayed)
      setValue("admission", 0);
  }, [selectedStudent, setValue]);

  // Get all courses filter by selected student grade
  const { courses } = useCoursesQuery({
    grade: studentGradeType,
  });

  // filter courses by already enrolled courses
  const filterCourses = () => {
    if (!courses || !alreadyEnrolledCourses) return [];
    const enrolledCourseCodes = alreadyEnrolledCourses.map(
      (course) => course.code
    );
    return courses.filter(
      (course: Course) => !enrolledCourseCodes.includes(course.code)
    );
  };

  const { mutate: enrollStudent, isLoading: creating } =
    useStudentEnrollCourseMutation();

  const onSubmit = async (values: FormValues) => {
    const input = {
      studentId: values.student.id,
      courseIds: values.courses.map((course) => course.id),
      paymentType: PaymentMethod.CASH,
      admission: values.admission,
      total: values.totalPayment,
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
            getOptionLabel={(option: any) => `${option.name} - ${option.fee}`}
            getOptionValue={(option: any) => option.id}
            options={filterCourses()}
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
