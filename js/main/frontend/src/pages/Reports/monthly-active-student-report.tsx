import PageBreadcrumb from "@components/common/PageBreadCrumb";
import TeacherReportDataList from "@components/report/teacher-report-data-list";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useCoursesQuery } from "@data/course";
import { SortOrder } from "@types";
import { useState } from "react";
import Button from "@components/ui/button/Button";
import EmployeeReportDataList from "@components/report/employee-report-data-list";
import InstituteIncomeReportDataList from "@components/report/institute-income-report-data-list";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import MonthlyActiveStudentReportDataList from "@components/report/monthly-active-student-reprort-data-list";

export default function MonthlyActiveStudentReport() {
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("id");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const { courses, loading, error, paginatorInfo } = useCoursesQuery({
    page,
    orderBy,
    sortedBy,
  });

  if (loading) return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  const reportData = [
    {
      id: 1,
      studentName: "Chamara Janith",
      month: "June",
      courseCode: "ENGG6B1RUKARI",
    },
    {
      id: 2,
      studentName: "Wageesha Wijesuriya",
      month: "June",
      courseCode: "ENGG6B1RUKARI",
    },
    {
      id: 3,
      studentName: "Saminda Janith",
      month: "June",
      courseCode: "MATG5B1RUKARI",
    },
    {
      id: 4,
      studentName: "Lasitha Ransara",
      month: "June",
      courseCode: "TAMG8B1HARSIV",
    },
  ];

  function handlePagination(current: number) {
    setPage(current);
  }

  return (
    <>
      <PageBreadcrumb pageTitle="Monthly Active Student Report" />
      <div className="flex justify-end py-2">
        <Button size="sm" className="mr-5">
          Export
        </Button>
      </div>
      <div className="space-y-6 mt-5">
        <MonthlyActiveStudentReportDataList
          reportData={reportData}
          paginatorInfo={paginatorInfo}
          onPagination={handlePagination}
          onOrder={setOrder}
          onSort={setColumn}
        />
      </div>
    </>
  );
}
