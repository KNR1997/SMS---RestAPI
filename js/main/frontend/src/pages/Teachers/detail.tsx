import { useParams } from "react-router-dom";
import PageBreadcrumb from "@components/common/PageBreadCrumb";
import { useUserQuery } from "@data/user";
import Loader from "@components/ui/loader/loader";
import ErrorMessage from "@components/ui/error-message";
import TeacherPaymentList from "@components/teacher/payment-list";
import { useEmployeePaymentsQuery } from "@data/employee-payment";
import { useState } from "react";
import { SortOrder } from "@types";

export default function TeacherDetailPage() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("id");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const { user } = useUserQuery(id!);

  const { employeePayments, loading, error, paginatorInfo } =
    useEmployeePaymentsQuery({
      employeeId: id,
      page,
      orderBy,
      sortedBy,
    });

  if (loading) return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  function handlePagination(current: number) {
    setPage(current);
  }

  return (
    <>
      <PageBreadcrumb
        pageTitle={`Teacher Details - ${user?.firstName} ${user?.lastName}`}
      />
      {/* {user && <CreateOrUpdateUserForm initialValues={user} />} */}
      <div className="space-y-6">
        <TeacherPaymentList
          employeePayments={employeePayments}
          paginatorInfo={paginatorInfo}
          onPagination={handlePagination}
          onOrder={setOrder}
          onSort={setColumn}
        />
      </div>
    </>
  );
}
