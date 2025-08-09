import PageBreadcrumb from "@components/common/PageBreadCrumb";
import ExamResultList from "@components/exam/exam-result-list";
import { useParams } from "react-router";
import Card from "@components/common/card";
import Button from "@components/ui/button/Button";
import { useExamQuery, useGenerateExamResultTableMutation } from "@data/exam";
import Loader from "@components/ui/loader/loader";
import ErrorMessage from "@components/ui/error-message";
import { useExamResultsQuery } from "@data/examResult";
import { useState } from "react";
import { SortOrder } from "@types";

export default function ExamResultsPage() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("id");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const { exam, loading: examLoading } = useExamQuery({
    slug: id!,
  });
  const { mutate: generateTable, isLoading } =
    useGenerateExamResultTableMutation();

  const { examResults, loading, error, paginatorInfo } = useExamResultsQuery({
    examId: id,
    page,
    orderBy,
    sortedBy,
  });

  if (loading || examLoading) return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  function handlePagination(current: number) {
    setPage(current);
  }

  const handleGenerateTable = () => {
    if (id) generateTable({ slug: id });
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Enter Exam Results" />
      <Card className="mb-8 flex flex-col">
        <div className="flex w-full flex-col justify-between md:flex-row">
          <div
            className="text-md font-semibold text-gray-800 dark:text-white/90"
            x-text="pageName"
          >
            Course: {exam?.course.name}
          </div>
          <div>
            <Button
              disabled={isLoading}
              size="sm"
              className="mr-5"
              onClick={() => handleGenerateTable()}
            >
              Generate Result table
            </Button>
          </div>
        </div>
      </Card>
      <ExamResultList
        examResults={examResults}
        paginatorInfo={paginatorInfo}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
      />
    </>
  );
}
