import PageBreadcrumb from "@components/common/PageBreadCrumb";
import CreateOrUpdateEventForm from "@components/event/event-form";

export default function CreateEventPage() {
  return (
    <>
      <PageBreadcrumb pageTitle="Create Event" />

      <CreateOrUpdateEventForm />
    </>
  );
}
