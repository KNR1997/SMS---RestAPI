import PageBreadcrumb from "@components/common/PageBreadCrumb";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { SortOrder } from "@types";
import { useState } from "react";
import Button from "@components/ui/button/Button";
import InstituteIncomeReportDataList from "@components/report/institute-income-report-data-list";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useInstituteMonthlyIncomeQuery } from "@data/report";

export default function InstituteIncomeReport() {
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("id");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const token = localStorage.getItem("token");

  const { instituteMonthlyIncomes, loading, error } =
    useInstituteMonthlyIncomeQuery();

  if (loading) return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  console.log("instituteMonthlyIncomes: ", instituteMonthlyIncomes);

  const reportData = [
    {
      id: 1,
      month: "March",
      income: 20000,
    },
    {
      id: 2,
      month: "April",
      income: 30000,
    },
    {
      id: 3,
      month: "May",
      income: 20000,
    },
    {
      id: 4,
      month: "June",
      income: 20000,
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
      categories: instituteMonthlyIncomes?.map(
        (data) => `${data.year}-${data.month}`
      ),
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
      name: "Income",
      data: instituteMonthlyIncomes?.map((data) => data.totalIncome),
    },
  ];

  async function handleExportOrder() {
    try {
      const response = await fetch(
        `/api/reports/export/institute-monthly-income`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.ms-excel",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to export file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "institute_income.xls";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export error:", error);
    }
  }

  return (
    <>
      <PageBreadcrumb pageTitle="Institute Income Report" />
      <div className="flex justify-end py-2">
        <Button onClick={handleExportOrder} size="sm" className="mr-5">
          Export
        </Button>
      </div>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Income Chart
          </h3>
        </div>

        <div className="max-w-full mt-5 overflow-x-auto custom-scrollbar">
          <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
            <Chart options={options} series={series} type="bar" height={180} />
          </div>
        </div>
      </div>
      <div className="space-y-6 mt-5">
        <InstituteIncomeReportDataList
          reportData={instituteMonthlyIncomes}
          // paginatorInfo={paginatorInfo}
          // onPagination={handlePagination}
          // onOrder={setOrder}
          // onSort={setColumn}
        />
      </div>
    </>
  );
}
