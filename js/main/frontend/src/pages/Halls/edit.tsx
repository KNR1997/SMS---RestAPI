import { useParams } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Loader from "../../components/ui/loader/loader";
import ErrorMessage from "../../components/ui/error-message";
import { useHallQuery } from "@data/hall";
import CreateOrUpdateHallForm from "@components/hall/hall-form";

export default function EditHallPage() {
  const { id } = useParams();

  const {hall, loading, error} = useHallQuery({
    slug: id!
  })

  if (loading) return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <PageBreadcrumb pageTitle="Edit Hall" />
      {hall && <CreateOrUpdateHallForm initialValues={hall} />}
    </>
  );
}
