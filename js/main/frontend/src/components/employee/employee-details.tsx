import Card from "@components/common/card";
import { useCoursePaymentsSummaryQuery } from "@data/enrollment-payment";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import SelectInput from "../ui/select-input";
import { useForm } from "react-hook-form";
import Badge from "@components/ui/badge/Badge";
import { ERole } from "@types";
import { useEffect } from "react";
import { monthOptions } from "../../constants/role";

interface IProps {
  employee: any;
  onCalculate: (totalIncome: number, monthNumber: number) => void;
  onReference: (data: any) => void;
}

type FormValues = {
  month: { label: string; value: number };
};

const defaultValues = {};

export default function EmployeeDetails({
  employee,
  onCalculate,
  onReference,
}: IProps) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: defaultValues,
  });

  const month = watch("month");

  const { coursePayments, loading, error } = useCoursePaymentsSummaryQuery({
    teacherId: employee?.id,
    monthNumber: month?.value ?? 0,
  });

  useEffect(() => {
    if (!coursePayments || coursePayments.length === 0) {
      onReference(null);
      onCalculate(25000, month?.value)
      return;
    }
    onReference(coursePayments);
  }, [coursePayments, onReference, month]);

  const onSubmit = async (values: FormValues) => {};

  const totalIncome = () => {
    const value = coursePayments?.reduce((sum, c) => sum + c.income, 0) || 0;
    const roundedValue = (value * 0.7).toFixed(2);
    onCalculate(roundedValue, month?.value);
    return value;
  };

  return (
    <div className="p-5 mt-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
        Employee Details
      </h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SelectInput
          name="month"
          placeholder="Select month..."
          control={control}
          options={monthOptions}
          isClearable={true}
        />
      </form>
      {employee && (
        <Card className="p-5 mt-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
          <div className="flex justify-between">
            <p className="text-sm mb-2 font-medium text-gray-800 dark:text-white/90">
              {employee.firstName} {employee.lastName}
            </p>
            <p className="text-sm mb-2 font-medium text-gray-800 dark:text-white/90">
              {employee.email}
            </p>
          </div>
          <Badge
            size="sm"
            color={
              employee.role == ERole.ROLE_ADMIN
                ? "success"
                : employee.role === ERole.ROLE_TEACHER
                ? "warning"
                : employee.role === ERole.ROLE_RECEPTIONIST
                ? "dark"
                : "primary"
            }
          >
            {employee.role}
          </Badge>
        </Card>
      )}
      {employee?.role == ERole.ROLE_TEACHER ? (
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Course Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Course Fee
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  No. of Students
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Income
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {coursePayments?.map((coursePayment) => (
                <TableRow key={coursePayment.courseName}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {coursePayment.courseName}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    Rs. {coursePayment.courseFee}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {coursePayment.studentCount}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    Rs. {coursePayment.income}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* {!!paginatorInfo?.total && (
          <div className="flex items-center justify-end pb-2">
            <Pagination
              total={paginatorInfo.total}
              current={paginatorInfo.currentPage}
              pageSize={paginatorInfo.perPage}
              onChange={onPagination}
            />
          </div>
        )} */}
          <div className="text-sm my-2 flex flex-col font-medium text-gray-800 dark:text-white/90">
            <div>Total: Rs. {totalIncome()} % 70</div>
            <div>Portion: Rs. {(totalIncome() * 0.7).toFixed(2)}</div>
          </div>
        </div>
      ) : (
        <div className="text-sm my-2 flex flex-col font-medium text-gray-800 dark:text-white/90">
          <div>Total: Rs. 25000</div>
        </div>
      )}
    </div>
  );
}
