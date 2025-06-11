import { useParams } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Loader from "../../components/ui/loader/loader";
import ErrorMessage from "../../components/ui/error-message";
import { useEnrollmentQuery } from "../../data/enrollment";
import CreateOrUpdateEnrollmentForm from "../../components/enrollment/enrollment-form";

export default function ViewEnrollmentPage() {
  const { id } = useParams();

  console.log("slug: ", id);

  const { enrollment, loading, error } = useEnrollmentQuery({
    slug: id!,
  });

  if (loading) return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <PageBreadcrumb pageTitle="Enrollment Details"  />
      {enrollment && (
        <CreateOrUpdateEnrollmentForm initialValues={enrollment} />
      )}
    </>
  );
}
