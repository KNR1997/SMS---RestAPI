import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import StudentEnrollForm from "../../components/student/student-enroll-form";

export default function StudentEnrollPage() {

  return (
    <>
      <PageBreadcrumb pageTitle="Enroll Student" />
      <StudentEnrollForm  />
    </>
  );
}
