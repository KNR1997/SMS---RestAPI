import { useForm } from "react-hook-form";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import SelectInput from "../ui/select-input";
import {
  Course,
  EEnrollmentStatus,
  Enrollment,
  PaymentMethod,
  Student,
} from "../../types";
import { useCreatePaymentMutation } from "../../data/payment";
import { useStudentsQuery } from "../../data/student";
import { useCoursesQuery } from "../../data/course";
import { useEffect } from "react";
import { useEnrollmentsQuery } from "@data/enrollment";
import Card from "@components/common/card";
import Badge from "@components/ui/badge/Badge";
import { monthOptions } from "../../constants/role";
import { useNavigate } from "react-router";

type FormValues = {
  student: Student;
  admission: string;
  courses: Course[];
  totalPayment: string;
  months: { label: string; value: string }[];
};

const defaultValues = {
  admission: "2000",
};

export default function CreatePaymentForm() {
  const navigate = useNavigate();

  const {
    control,
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: defaultValues,
  });

  const { students } = useStudentsQuery({});
  const { mutate: createPayment, isLoading: creating } =
    useCreatePaymentMutation();

  const selectedStudent = watch("student");
  const selectedCourses = watch("courses");
  const selectedMonths = watch("months");
  const studentGradeType = selectedStudent?.gradeType;

  const { enrollments } = useEnrollmentsQuery({
    studentId: selectedStudent?.id,
  });

  useEffect(() => {
    if (selectedStudent) {
      if (selectedStudent.admissionPayed) {
        setValue("admission", "0");
      } else {
        setValue("admission", "2000");
      }
    } else {
      setValue("admission", "2000");
    }
  }, [selectedStudent, setValue]);

  const { courses } = useCoursesQuery({
    gradeType: studentGradeType,
  });

  const eligibleCoursesToCreatePayment = () => {
    if (!enrollments || !courses) return [];

    return courses.filter((course) =>
      enrollments.some((enrollment) => enrollment.courseCode == course.code)
    );
  };

  const calculatePaymentTotal = () => {};

  const onSubmit = async (values: FormValues) => {
    const input = {
      studentId: values.student.id,
      admission: values.admission,
      totalAmount: values.totalPayment,
      paymentMethod: PaymentMethod.CASH,
      coursePaymentList: values.courses.map((course) => ({
        courseId: course.id,
        paymentMonths: values.months.map((month) => month.value),
      })),
    };
    createPayment({ ...input });
  };

  const enableCreatePaymentButton = () => {
    return (
      selectedStudent != null &&
      selectedCourses?.length > 0 &&
      selectedMonths?.length > 0
    );
  };

  const totalPayment =
    (selectedStudent?.admissionPayed ? 0 : 2000) +
    (selectedCourses?.reduce((sum, course) => sum + course.fee, 0) || 0);

  return (
    <div className="grid grid-cols-2 gap-5  ">
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
              options={eligibleCoursesToCreatePayment()}
              isClearable={true}
              isMulti
            />
            {errors.courses && (
              <p className="text-error-500 text-sm mt-1">
                {errors.courses.message}
              </p>
            )}
          </div>
          <div>
            <Label>
              Paying Months <span className="text-error-500">*</span>
            </Label>
            <SelectInput
              name="months"
              control={control}
              getOptionLabel={(option: any) => option.label}
              getOptionValue={(option: any) => option.value}
              options={monthOptions}
              isClearable={true}
              isMulti
            />
            {errors.months && (
              <p className="text-error-500 text-sm mt-1">
                {errors.months.message}
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
              value={totalPayment}
              errorMessage={errors.totalPayment?.message!}
              disabled
            />
          </div>
          <Button disabled={!enableCreatePaymentButton() || creating} size="sm">
            Create Payment
          </Button>
        </div>
      </form>
      <div className="p-5 mt-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
          Student Enrollments
        </h4>
        {enrollments.length > 0 ? (
          enrollments.map((enrollment: Enrollment) => (
            <Card
              key={enrollment.id}
              className="p-5 mt-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6"
            >
              <p className="text-sm mb-2 font-medium text-gray-800 dark:text-white/90">
                {enrollment.courseName}
              </p>
              <div className="flex gap-5">
                <Badge
                  size="sm"
                  color={
                    enrollment.status === EEnrollmentStatus.ACTIVE
                      ? "success"
                      : enrollment.status === EEnrollmentStatus.LOCKED
                      ? "warning"
                      : "error"
                  }
                >
                  {enrollment.status}
                </Badge>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  {enrollment.lastPaidMonthName}
                </p>
              </div>
            </Card>
          ))
        ) : (
          <Button onClick={() => navigate("/enrollments/create")} size="sm">
            Enroll Student
          </Button>
        )}
      </div>
    </div>
  );
}
