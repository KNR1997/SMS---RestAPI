import { useParams } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Loader from "../../components/ui/loader/loader";
import ErrorMessage from "../../components/ui/error-message";
import CreateOrUpdateSubjectForm from "../../components/subject/subject-form";
import { useSubjectQuery } from "../../data/subject";

export default function EditSubjectPage() {
  const { slug } = useParams();
  const {subject, loading, error} = useSubjectQuery({
    slug: slug!
  })

  if (loading) return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <PageBreadcrumb pageTitle="Edit Subject" />
      {subject && <CreateOrUpdateSubjectForm initialValues={subject} />}
    </>
  );
}
