import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import CreateOrUpdateCourseForm from "../../components/course/course-form";

export default function CreateCoursePage() {
  return (
    <>
      <PageBreadcrumb pageTitle="Create Course" />

      <CreateOrUpdateCourseForm />
    </>
  );
}
