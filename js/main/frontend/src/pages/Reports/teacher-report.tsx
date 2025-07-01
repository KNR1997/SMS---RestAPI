import PageBreadcrumb from "@components/common/PageBreadCrumb";
import TeacherReportDataList from "@components/report/teacher-report-data-list";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useCoursesQuery } from "@data/course";
import { SortOrder } from "@types";
import { useState } from "react";
import Button from "@components/ui/button/Button";
import Card from "@components/common/card";
import Search from "@components/common/search";
import { Menu, Transition } from "@headlessui/react";
import { DownloadIcon, MoreDotIcon } from "../../icons";
import classNames from "classnames";
import cn from "classnames";
import { ArrowUp } from "@components/icons/arrow-up";
import { ArrowDown } from "@components/icons/arrow-down";
import InvoiceFilter from "@components/report/invoice-filter";
import TeacherReportFilter from "@components/report/invoice-filter";

export default function TeacherReport() {
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("id");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const [visible, setVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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
      teacherName: "Chamara Jayaweera",
      // courseName: "GRADE_8_Maths_Batch1",
      month: "June",
      payment: 45000,
    },
    {
      id: 2,
      teacherName: "Jayashakthi Perera",
      // courseName: "GRADE_8_Science_Batch1",
      month: "June",
      payment: 30000,
    },
    {
      id: 3,
      teacherName: "Sanjeewani Perera",
      // courseName: "GRADE_9_Maths_Batch1",
      month: "June",
      payment: 50000,
    },
    {
      id: 4,
      teacherName: "Rukshan Wijesuriya",
      // courseName: "GRADE_9_Maths_Batch2",
      month: "June",
      payment: 70000,
    },
    {
      id: 5,
      teacherName: "Dilshan Perera",
      // courseName: "GRADE_8_History_Batch1",
      month: "June",
      payment: 65000,
    },
  ];

  function handlePagination(current: number) {
    setPage(current);
  }

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    setPage(1);
  }

  function toggleVisible() {
    setVisible((v) => !v);
  }

  return (
    <>
      <PageBreadcrumb pageTitle="Teacher Payment Report" />
      <Card className="mb-8 flex flex-col">
        <div className="flex w-full flex-col items-center md:flex-row">
          <div className="flex w-full gap-5 flex-row items-center ms-auto md:w-2/4">
            <TeacherReportFilter
              className="w-full"
              onLocationStatusFilter={(object: any) => {
                // setLocation(object?.value);
                // setPage(1);
              }}
              onFGStatusFilter={(object: any) => {
                // setFgsStatus(object?.value);
                // setPage(1);
              }}
              onFinanceStatusFilter={(object: any) => {
                // setFinanceStatus(object?.value);
                // setPage(1);
              }}
              // onDateRangeFilter={onDateRangeFilter}
              // enableLocation
              // enableDateRange
              enableFGStatus
              enableFinanceStatus
            />
            <Search
              onSearch={handleSearch}
              placeholderText="Search by Teacher Name"
            />
            {/* <Menu
              as="div"
              className="relative inline-block ltr:text-left rtl:text-right"
            >
              <Menu.Button className="group p-2 dark:text-white/90">
                <MoreDotIcon />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  as="ul"
                  className={classNames(
                    "shadow-700 dark:text-black/90 dark:bg-white  absolute z-50 mt-2 w-52 overflow-hidden rounded border border-border-200 bg-light py-2 focus:outline-none ltr:right-0 ltr:origin-top-right rtl:left-0 rtl:origin-top-left"
                  )}
                >
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleExportOrder}
                        className={classNames(
                          "flex w-full items-center space-x-3 px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none rtl:space-x-reverse",
                          active ? "text-accent" : "text-body"
                        )}
                      >
                        <DownloadIcon className="w-5 shrink-0" />
                        <span className="whitespace-nowrap">Invoices</span>
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu> */}
          </div>

          <button
            className="mt-5 flex items-center whitespace-nowrap text-base font-semibold text-accent md:mt-0 md:ms-5 dark:text-white/90"
            onClick={toggleVisible}
          >
            Filters
            {visible ? (
              <ArrowUp className="ms-2" />
            ) : (
              <ArrowDown className="ms-2" />
            )}
          </button>
        </div>

        {/* <div
          className={cn("flex w-full transition", {
            "visible h-auto": visible,
            "invisible h-0": !visible,
          })}
        >
          <div className="mt-5 flex w-full flex-col border-t border-gray-200 pt-5 md:mt-8 md:flex-row md:items-center md:pt-8">
            <TeacherReportFilter
              className="w-full"
              onLocationStatusFilter={(object: any) => {
                // setLocation(object?.value);
                // setPage(1);
              }}
              onFGStatusFilter={(object: any) => {
                // setFgsStatus(object?.value);
                // setPage(1);
              }}
              onFinanceStatusFilter={(object: any) => {
                // setFinanceStatus(object?.value);
                // setPage(1);
              }}
              // onDateRangeFilter={onDateRangeFilter}
              // enableLocation
              // enableDateRange
              enableFGStatus
              enableFinanceStatus
            />
          </div>
        </div> */}
      </Card>
      {/* <div className="flex justify-end py-2">
        <Button size="sm" className="mr-5">
          Export
        </Button>
      </div> */}
      <div className="space-y-6">
        <TeacherReportDataList
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
