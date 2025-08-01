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
import StudentRegistrationIncrementReportDataList from "@components/report/student-registration-increment-report-data-list";

export default function StudentRegistrationIncrementReport() {
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("id");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const { courses, loading, error, paginatorInfo } = useCoursesQuery({
    page,
    is_active: true,
    orderBy,
    sortedBy,
  });

  if (loading) return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  const reportData = [
    {
      id: 1,
      studentName: "Chamara Janith",
      grade: "Grade 5",
      registeredDate: "2025-06-04",
    },
    {
      id: 2,
      studentName: "Wageesha Wijesuriya",
      grade: "Grade 6",
      registeredDate: "2025-06-14",
    },
    {
      id: 3,
      studentName: "Saminda Janith",
      grade: "Grade 7",
      registeredDate: "2025-06-19",
    },
    {
      id: 4,
      studentName: "Lasitha Ransara",
      grade: "Grade 10",
      registeredDate: "2025-06-24",
    },
  ];

  function handlePagination(current: number) {
    setPage(current);
  }

  const options: ApexOptions = {
    colors: ["#465fff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["March", "April", "May", "June", "July"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val: number) => `${val}`,
      },
    },
  };

  const series = [
    {
      name: "Count",
      data: [5, 10, 20, 15, 10],
    },
  ];

  return (
    <>
      <PageBreadcrumb pageTitle="Student Registration Increment Report" />
      <div className="flex justify-end py-2">
        <Button size="sm" className="mr-5">
          Export
        </Button>
      </div>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Chart
          </h3>
        </div>

        <div className="max-w-full mt-5 overflow-x-auto custom-scrollbar">
          <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
            <Chart options={options} series={series} type="bar" height={180} />
          </div>
        </div>
      </div>
      <div className="space-y-6 mt-5">
        <StudentRegistrationIncrementReportDataList
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
