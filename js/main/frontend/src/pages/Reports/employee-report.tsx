import PageBreadcrumb from "@components/common/PageBreadCrumb";
import TeacherReportDataList from "@components/report/teacher-report-data-list";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useCoursesQuery } from "@data/course";
import { SortOrder } from "@types";
import { useState } from "react";
import Button from "@components/ui/button/Button";
import EmployeeReportDataList from "@components/report/employee-report-data-list";
import { useEmployeePaymentsQuery } from "@data/employee-payment";
import EmployeePaymentReportDataList from "@components/report/employee-payment-report-data-list";

export default function EmployeeReport() {
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("id");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const { employeePayments, loading, error, paginatorInfo } =
    useEmployeePaymentsQuery({
      page,
      orderBy,
      sortedBy,
    });


  if (loading) return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  const reportData = [
    {
      id: 1,
      employeeName: "Chamara Jayaweera",
      role: "Teacher",
      month: "June",
      payment: 20000,
    },
    {
      id: 2,
      employeeName: "Ishara Perera",
      role: "Manager",
      month: "June",
      payment: 30000,
    },
    {
      id: 3,
      employeeName: "Sanjeewani Perera",
      role: "Teacher",
      month: "June",
      payment: 20000,
    },
    {
      id: 4,
      employeeName: "Rukshan Wijesuriya",
      role: "Teacher",
      month: "June",
      payment: 20000,
    },
    {
      id: 5,
      employeeName: "Yasitha Jayashan",
      role: "Receptionist",
      month: "June",
      payment: 10000,
    },
  ];

  function handlePagination(current: number) {
    setPage(current);
  }

  return (
    <>
      <PageBreadcrumb pageTitle="Employee Payment Report" />
      <div className="flex justify-end py-2">
        <Button size="sm" className="mr-5">
          Export
        </Button>
      </div>
      <div className="space-y-6">
        <EmployeePaymentReportDataList
          reportData={employeePayments}
          paginatorInfo={paginatorInfo}
          onPagination={handlePagination}
          onOrder={setOrder}
          onSort={setColumn}
        />
      </div>
    </>
  );
}
