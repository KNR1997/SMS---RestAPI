import PageBreadcrumb from "@components/common/PageBreadCrumb";
import TeacherReportDataList from "@components/report/teacher-report-data-list";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useCoursesQuery } from "@data/course";
import { EGrade, SortOrder } from "@types";
import { useState } from "react";
import Button from "@components/ui/button/Button";
import StudentReportDataList from "@components/report/student-report-data-list";
import { useExamsQuery } from "@data/exam";
import ExamList from "@components/exam/exam-list";
import Card from "@components/common/card";
import Search from "@components/common/search";
import { ArrowUp } from "@components/icons/arrow-up";
import { ArrowDown } from "@components/icons/arrow-down";
import cn from "classnames";
import CourseFilter from "@components/course/course-filter";
import ExamReportList from "@components/report/exam-report-list";

export default function StudentReport() {
  const [searchTerm, setSearchTerm] = useState("");
  const [grade, setGrade] = useState<EGrade | null>(null);
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("id");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const { exams, loading, error, paginatorInfo } = useExamsQuery({
    page,
    name: searchTerm,
    grade: grade,
    orderBy,
    sortedBy,
  });

  if (loading) return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  function handlePagination(current: number) {
    setPage(current);
  }
  function toggleVisible() {
    setVisible((v) => !v);
  }
  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    setPage(1);
  }

  return (
    <>
      <PageBreadcrumb pageTitle="Student Result Report" />
      <Card className="mb-8 flex flex-col">
        <div className="flex w-full flex-col items-center md:flex-row">
          <div className="flex w-full flex-row items-center ms-auto md:w-2/4">
            <Search
              onSearch={handleSearch}
              placeholderText="Search by Course Name"
            />
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

        <div
          className={cn("flex w-full transition", {
            "visible h-auto": visible,
            "invisible h-0": !visible,
          })}
        >
          <div className="mt-5 flex w-full flex-col border-t border-gray-200 pt-5 md:mt-8 md:flex-row md:items-center md:pt-8">
            <CourseFilter
              className="w-full"
              onGradeFilter={(object: any) => {
                setGrade(object?.value);
                setPage(1);
              }}
              enableGrade
            />
          </div>
        </div>
      </Card>
      <div className="space-y-6">
        <ExamReportList
          exams={exams}
          paginatorInfo={paginatorInfo}
          onPagination={handlePagination}
          onOrder={setOrder}
          onSort={setColumn}
        />
      </div>
    </>
  );
}
