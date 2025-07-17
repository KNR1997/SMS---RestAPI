import { useForm } from "react-hook-form";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import SelectInput from "../ui/select-input";
import { Course, ERole, Student } from "../../types";
import { useUsersQuery } from "@data/user";
import EmployeeDetails from "./employee-details";
import { useCreateEmployeePaymentMutation } from "@data/employee-payment";
import { useState } from "react";
import { roleOptions } from "../../constants/role";

type FormValues = {
  role: { label: string; value: ERole };
  employee: Student;
  admission: string;
  courses: Course[];
  totalPayment: number;
  months: { label: string; value: string }[];
  reference: string;
};

const defaultValues = {
  admission: "2000",
};

export default function CreateEmployeePaymentForm() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [monthNumber, setMonthNumber] = useState(0);
  const [coursePayments, setCoursePayments] = useState([]);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: defaultValues,
  });

  const selectedRole = watch("role");

  const { users } = useUsersQuery({
    role: selectedRole ? selectedRole.value : null,
  });
  const { mutate: createEmployeePayment, isLoading: creating } =
    useCreateEmployeePaymentMutation();

  const selectedEmployee = watch("employee");

  const onSubmit = async (values: FormValues) => {
    const input = {
      employeeId: values.employee.id,
      monthNumber: monthNumber,
      amount: totalIncome,
      reference: `${selectedEmployee.firstName} ${selectedEmployee.lastName}`,
      coursePaymentSummaries: coursePayments,
    };
    createEmployeePayment({ ...input });
  };

  const handleSetIncomeValue = (totalIncome: number, monthNumber: number) => {
    setTotalIncome(totalIncome);
    setMonthNumber(monthNumber);
  };

  const handleSetReference = (coursePayments: any) => {
    setCoursePayments(coursePayments);
  };

  return (
    <div className="grid grid-cols-2 gap-5  ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div>
            <Label>
              Employee Type <span className="text-error-500">*</span>
            </Label>
            <SelectInput
              name="role"
              control={control}
              options={roleOptions}
              isClearable={true}
            />
            {errors.role && (
              <p className="text-error-500 text-sm mt-1">
                {errors.role.message}
              </p>
            )}
          </div>
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
              value={totalIncome}
              errorMessage={errors.totalPayment?.message!}
              disabled
            />
          </div>
          <Button disabled={creating || totalIncome <= 0} size="sm">
            Create Payment
          </Button>
        </div>
      </form>
      <EmployeeDetails
        employee={selectedEmployee}
        onCalculate={handleSetIncomeValue}
        onReference={handleSetReference}
      />
    </div>
  );
}
