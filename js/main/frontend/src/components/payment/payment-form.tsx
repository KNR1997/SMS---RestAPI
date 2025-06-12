import { useForm } from "react-hook-form";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import SelectInput from "../ui/select-input";
import {
  Course,
  PaymentMethod,
  Student,
} from "../../types";
import { useCreatePaymentMutation } from "../../data/payment";
import { useStudentsQuery } from "../../data/student";
import { useCoursesQuery } from "../../data/course";

type FormValues = {
  student: Student;
  admission: string;
  courses: Course[];
  totalPayment: string;
};

const defaultValues = {
  admission: "2000",
  totalPayment: "4000",
};

export default function CreatePaymentForm() {
  const {
    control,
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
  const studentGradeType = selectedStudent?.gradeType;

  const { courses } = useCoursesQuery({
    gradeType: studentGradeType,
  });

  const onSubmit = async (values: FormValues) => {
    const input = {
      studentId: values.student.id,
      admission: values.admission,
      totalAmount: values.totalPayment,
      paymentMethod: PaymentMethod.CASH,
      coursePaymentList: courses.map((course) => ({
        courseId: course.id,
        paymentMonths: [6, 7],
      })),
    };

    console.log("form values: ", input);

    createPayment({ ...input });
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
