import { useParams } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Loader from "../../components/ui/loader/loader";
import ErrorMessage from "../../components/ui/error-message";
import { useCourseQuery } from "../../data/course";
import CreateOrUpdateCourseForm from "../../components/course/course-form";

export default function EditCoursePage() {
  const { slug } = useParams();

  const {course, loading, error} = useCourseQuery({
    slug: slug!
  })

  if (loading) return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <PageBreadcrumb pageTitle="Edit Course" />
      {course && <CreateOrUpdateCourseForm initialValues={course} />}
    </>
  );
}
