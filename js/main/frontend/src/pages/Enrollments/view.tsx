import { useParams } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Loader from "../../components/ui/loader/loader";
import ErrorMessage from "../../components/ui/error-message";
import { useEnrollmentQuery } from "../../data/enrollment";
import EnrollmentDetails from "../../components/enrollment/enrollment-details";

export default function ViewEnrollmentPage() {
  const { id } = useParams();

  const { enrollment, loading, error } = useEnrollmentQuery({
    slug: id!,
  });

  if (loading) return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <PageBreadcrumb pageTitle="Enrollment Details"  />
      {enrollment && (
        <EnrollmentDetails initialValues={enrollment} />
      )}
    </>
  );
}
