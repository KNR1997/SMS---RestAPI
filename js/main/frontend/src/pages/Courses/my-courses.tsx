import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Loader from "../../components/ui/loader/loader";
import ErrorMessage from "../../components/ui/error-message";
import { useState } from "react";
import { SortOrder } from "../../types";
import CourseList from "../../components/course/course-list";
import { useMyCoursesQuery } from "../../data/student";
import { useAuth } from "../../context/AuthContext";

export default function MyCourses() {
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const [orderBy, setOrder] = useState("id");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const { courses, loading, error, paginatorInfo } = useMyCoursesQuery({
    studentId: user.studentId,
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
      <PageBreadcrumb pageTitle="Courses" />
      <div className="space-y-6">
        <CourseList
          courses={courses}
          paginatorInfo={paginatorInfo}
          onPagination={handlePagination}
          onOrder={setOrder}
          onSort={setColumn}
        />
      </div>
    </>
  );
}
