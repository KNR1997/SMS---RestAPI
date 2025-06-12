import { useParams } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Loader from "../../components/ui/loader/loader";
import ErrorMessage from "../../components/ui/error-message";
import { useGuardianQuery } from "../../data/guardian";
import CreateOrUpdateGuardianForm from "../../components/guardian/guardian-form";

export default function EditGuardianPage() {
  const { id } = useParams();

  const { guardian, loading, error } = useGuardianQuery({
    slug: id!,
  });

  if (loading) return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <PageBreadcrumb pageTitle="Edit Guardian" />
      {guardian && <CreateOrUpdateGuardianForm initialValues={guardian} />}
    </>
  );
}
