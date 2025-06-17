import PageBreadcrumb from "@components/common/PageBreadCrumb";
import CreateOrUpdateExamForm from "@components/exam/exam-form";

export default function CreateExamPage() {
  return (
    <>
      <PageBreadcrumb pageTitle="Create Exam" />

      <CreateOrUpdateExamForm />
    </>
  );
}
