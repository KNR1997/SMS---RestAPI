import { useParams } from "react-router-dom";
import PageBreadcrumb from "@components/common/PageBreadCrumb";
import Loader from "@components/ui/loader/loader";
import ErrorMessage from "@components/ui/error-message";
import { useExamPageDataQuery } from "@data/exam";
import CreateOrUpdateExamForm from "@components/exam/exam-form";

export default function EditExamPage() {
  const { id } = useParams();

  const { examPageData, loading, error } = useExamPageDataQuery({
    slug: id!,
  });

  if (loading) return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <PageBreadcrumb pageTitle="Edit Exam" />
      {examPageData && <CreateOrUpdateExamForm initialValues={examPageData} />}
    </>
  );
}
