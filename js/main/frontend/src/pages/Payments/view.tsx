import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PaymentDetails from "@components/payment/payment-details";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { usePaymentQuery } from "@data/payment";
import { useParams } from "react-router";

export default function PaymentViewPage() {
  const { id } = useParams();

  const { payment, loading, error } = usePaymentQuery({
    slug: id!,
  });

  if (loading) return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <PageBreadcrumb pageTitle="Payment Details" />
      {payment && <PaymentDetails initialValues={payment} />}
    </>
  );
}
