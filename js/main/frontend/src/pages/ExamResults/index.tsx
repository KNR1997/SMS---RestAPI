import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import CourseList from "@components/course/course-list";
import ExamResultList from "@components/examResult/exam-result-list";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useCoursesQuery } from "@data/course";
import { useExamResultsQuery } from "@data/examResult";
import { SortOrder } from "@types";
import { useState } from "react";
import Card from "@components/common/card";

export default function ExamResults() {
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("id");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const { examResults, loading, error, paginatorInfo } = useExamResultsQuery({
    page,
    orderBy,
    sortedBy,
  });

  console.log("examResults: ", examResults);

  if (loading) return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  function handlePagination(current: number) {
    setPage(current);
  }

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Exam Results" />
      <div className="space-y-6">
        <ExamResultList
          examResults={examResults}
          paginatorInfo={paginatorInfo}
          onPagination={handlePagination}
          onOrder={setOrder}
          onSort={setColumn}
        />
      </div>
    </>
  );
}
