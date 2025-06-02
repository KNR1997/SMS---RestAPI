import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import CreateOrUpdateStudentForm from "../../components/student/student-form";
import CreateOrUpdateUserForm from "../../components/user/user-form";

export default function CreateStudentPage() {
  return (
    <>
      <PageBreadcrumb pageTitle="Create Student" />

      <CreateOrUpdateStudentForm />
    </>
  );
}
