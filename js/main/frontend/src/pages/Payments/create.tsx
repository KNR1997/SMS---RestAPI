import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import CreatePaymentForm from "../../components/payment/payment-form";

export default function CreatePaymentPage() {
  return (
    <>
      <PageBreadcrumb pageTitle="Create Payment" />

      <CreatePaymentForm />
    </>
  );
}
