import { EnrollmentPageData } from "../../types";
import EnrollmentPaymentList from "../enrollmentPayment/enrollmentPayment-list";
import Badge from "../ui/badge/Badge";

interface Props {
  initialValues?: EnrollmentPageData;
}

export default function EnrollmentDetails({ initialValues }: Props) {
  console.log("initialValues: ", initialValues);
  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Course Information
            </h4>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Last Payed Month
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {initialValues?.lastPaidMonthName}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Course Name
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {initialValues?.courseDetails.name}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Course Code
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {initialValues?.courseDetails.code}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Grade
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {initialValues?.courseDetails.gradeType}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Batch
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {initialValues?.courseDetails.batch}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Student Information
            </h4>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  First Name
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {initialValues?.firstName}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Last Name
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {initialValues?.lastName}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  StudentID
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {initialValues?.studentId}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Birthday
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {initialValues?.dateOfBirth}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Admission Payed
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  <Badge
                    size="sm"
                    color={initialValues?.admissionPayed ? "success" : "error"}
                  >
                    {initialValues?.admissionPayed ? "Yes" : "No"}
                  </Badge>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 mt-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Payments
            </h4>
            <EnrollmentPaymentList
              enrollmentPayments={initialValues?.enrollmentPayments}
            />
            {/* <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Months
                </p>
                {initialValues?.enrollmentPayments.map((enrollmentPayment) => (
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {enrollmentPayment.monthName}
                  </p>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
