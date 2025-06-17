import { useParams } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Loader from "../../components/ui/loader/loader";
import ErrorMessage from "../../components/ui/error-message";
import CreateOrUpdateEventForm from "@components/event/event-form";
import { useEventQuery } from "@data/event";

export default function EditEventPage() {
  const { id } = useParams();

  const { event, loading, error } = useEventQuery({
    slug: id!,
  });

  if (loading) return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <PageBreadcrumb pageTitle="Edit Event" />
      {event && <CreateOrUpdateEventForm initialValues={event} />}
    </>
  );
}
