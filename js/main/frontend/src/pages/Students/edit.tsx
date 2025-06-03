import { useParams } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Loader from "../../components/ui/loader/loader";
import ErrorMessage from "../../components/ui/error-message";
import CreateOrUpdateStudentForm from "../../components/student/student-form";
import { useStudentQuery } from "../../data/student";

export default function EditStudentPage() {
  const { id } = useParams();

  const { student, loading, error } = useStudentQuery({
    slug: id!,
  });

  if (loading) return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <PageBreadcrumb pageTitle="Edit Student" />
      {student && <CreateOrUpdateStudentForm initialValues={student} />}
    </>
  );
}
