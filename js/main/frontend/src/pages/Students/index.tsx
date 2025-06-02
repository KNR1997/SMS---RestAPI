import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Loader from "../../components/ui/loader/loader";
import ErrorMessage from "../../components/ui/error-message";
import { useState } from "react";
import { SortOrder } from "../../types";
import { useStudentsQuery } from "../../data/student";
import StudentList from "../../components/student/student-list";

export default function Students() {
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("id");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const { students, loading, error, paginatorInfo } = useStudentsQuery({
    page,
    orderBy,
    sortedBy,
  });

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
      <PageBreadcrumb pageTitle="Students" />
      <div className="space-y-6">
        <StudentList
          students={students}
          paginatorInfo={paginatorInfo}
          onPagination={handlePagination}
          onOrder={setOrder}
          onSort={setColumn}
        />
      </div>
    </>
  );
}
