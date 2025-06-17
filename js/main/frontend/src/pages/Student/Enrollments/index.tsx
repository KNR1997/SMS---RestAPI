import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import EnrollmentList from "@components/enrollment/enrollment-list";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useEnrollmentsQuery } from "@data/enrollment";
import { SortOrder } from "@types";
import { useState } from "react";

export default function StudentEnrollments() {
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("id");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const { enrollments, loading, error, paginatorInfo } = useEnrollmentsQuery({
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
      <PageBreadcrumb pageTitle="My Enrollments" />
      <div className="space-y-6">
        <EnrollmentList
          enrollments={enrollments}
          paginatorInfo={paginatorInfo}
          onPagination={handlePagination}
          onOrder={setOrder}
          onSort={setColumn}
          showActions={false}
        />
      </div>
    </>
  );
}
