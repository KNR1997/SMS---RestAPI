import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import CreateOrUpdateStudentForm from "../../components/student/student-form";

export default function CreateStudentPage() {
  return (
    <>
      <PageBreadcrumb pageTitle="Create Student" />

      <CreateOrUpdateStudentForm />
    </>
  );
}
