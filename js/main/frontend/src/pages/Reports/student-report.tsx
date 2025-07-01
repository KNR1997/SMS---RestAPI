import PageBreadcrumb from "@components/common/PageBreadCrumb";
import TeacherReportDataList from "@components/report/teacher-report-data-list";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useCoursesQuery } from "@data/course";
import { SortOrder } from "@types";
import { useState } from "react";
import Button from "@components/ui/button/Button";
import StudentReportDataList from "@components/report/student-report-data-list";

export default function StudentReport() {
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
      studentName: "Lasitha Ransara",
      courseName: "GRADE_8_Maths_Batch1",
      grade: "87",
    },
    {
      id: 2,
      studentName: "Dushani Wijesuriya",
      courseName: "GRADE_8_Science_Batch1",
      grade: "78",
    },
    {
      id: 3,
      studentName: "Wageesha Perera",
      courseName: "GRADE_9_Maths_Batch1",
      grade: "80",
    },
    {
      id: 4,
      studentName: "Saminda Janith",
      courseName: "GRADE_9_Maths_Batch2",
      grade: "76",
    },
    {
      id: 5,
      studentName: "Jaintha Chamara",
      courseName: "GRADE_8_History_Batch1",
      grade: "80",
    },
  ];

  function handlePagination(current: number) {
    setPage(current);
  }

  return (
    <>
      <PageBreadcrumb pageTitle="Student Result Report" />
      <div className="flex justify-end py-2">
        <Button size="sm" className="mr-5">
          Export
        </Button>
      </div>
      <div className="space-y-6">
        <StudentReportDataList
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
