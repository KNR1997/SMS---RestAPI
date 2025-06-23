import EnrollmentPaymentList from "@components/enrollmentPayment/enrollmentPayment-list";
import Badge from "@components/ui/badge/Badge";
import { EnrollmentPageData, Payment } from "@types";


interface Props {
  initialValues?: Payment;
}

export default function PaymentDetails({ initialValues }: Props) {
  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Payment Information
            </h4>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Payer
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {initialValues?.payerType}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Payee
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {initialValues?.payeeType}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Amount
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Rs. {initialValues?.totalAmount}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </>
  );
}
