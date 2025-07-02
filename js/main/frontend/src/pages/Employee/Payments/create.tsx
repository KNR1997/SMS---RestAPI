import PageBreadcrumb from "@components/common/PageBreadCrumb";
import CreateEmployeePaymentForm from "@components/employee/employee-payment-form";

export default function CreateEmployeePaymentPage() {
  return (
    <>
      <PageBreadcrumb pageTitle="Create Employee Payment" />

      <CreateEmployeePaymentForm />
    </>
  );
}
