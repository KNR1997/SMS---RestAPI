import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import CreateOrUpdateSubjectForm from "../../components/subject/subject-form";

export default function CreateSubjectPage() {
  return (
    <>
      <PageBreadcrumb pageTitle="Create Subject" />

      <CreateOrUpdateSubjectForm />
    </>
  );
}
