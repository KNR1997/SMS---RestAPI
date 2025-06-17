import PageBreadcrumb from "@components/common/PageBreadCrumb";
import CreateOrUpdateHallForm from "@components/hall/hall-form";


export default function CreateHallPage() {
  return (
    <>
      <PageBreadcrumb pageTitle="Create Hall" />

      <CreateOrUpdateHallForm />
    </>
  );
}
