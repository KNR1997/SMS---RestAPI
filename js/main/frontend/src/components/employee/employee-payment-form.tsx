import { useForm } from "react-hook-form";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import SelectInput from "../ui/select-input";
import { Course, ERole, Student } from "../../types";
import { useUsersQuery } from "@data/user";
import EmployeeDetails from "./employee-details";
import { useCreateEmployeePaymentMutation } from "@data/employee-payment";

type FormValues = {
  employee: Student;
  admission: string;
  courses: Course[];
  totalPayment: string;
  months: { label: string; value: string }[];
};

const defaultValues = {
  admission: "2000",
  totalPayment: "4000",
};

export default function CreateEmployeePaymentForm() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: defaultValues,
  });

  const { users } = useUsersQuery({
    role: ERole.ROLE_TEACHER,
  });
  const { mutate: createEmployeePayment, isLoading: creating } =
    useCreateEmployeePaymentMutation();

  const selectedEmployee = watch("employee");

  const onSubmit = async (values: FormValues) => {
    const input = {
      employeeId: values.employee.id,
      monthNumber: 7,
      amount: 4900,
    };
     createEmployeePayment({ ...input });
  };

  // const enableCreatePaymentButton = () => {
  //   return (
  //     selectedStudent != null &&
  //     selectedCourses?.length > 0 &&
  //     selectedMonths?.length > 0
  //   );
  // };

  return (
    <div className="grid grid-cols-2 gap-5  ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div>
            <Label>
              Employee <span className="text-error-500">*</span>
            </Label>
            <SelectInput
              name="employee"
              control={control}
              getOptionLabel={(option: any) => option.firstName}
              getOptionValue={(option: any) => option.id}
              options={users}
              isClearable={true}
            />
            {errors.employee && (
              <p className="text-error-500 text-sm mt-1">
                {errors.employee.message}
              </p>
            )}
          </div>
          <div>
            <Label>
              Payment <span className="text-error-500">*</span>{" "}
            </Label>
            <Input
              {...register("totalPayment")}
              errorMessage={errors.totalPayment?.message!}
              disabled
            />
          </div>
          <Button 
          // disabled={!enableCreatePaymentButton() || creating} 
          size="sm">
            Create Payment
          </Button>
        </div>
      </form>
      <EmployeeDetails employee={selectedEmployee} />
    </div>
  );
}
