import PageBreadcrumb from "@components/common/PageBreadCrumb";
import TeacherReportDataList from "@components/report/teacher-report-data-list";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { ERole, SortOrder } from "@types";
import { useState } from "react";
import Card from "@components/common/card";
import Search from "@components/common/search";
import { ArrowUp } from "@components/icons/arrow-up";
import { ArrowDown } from "@components/icons/arrow-down";
import { useUsersQuery } from "@data/user";

export default function TeacherReport() {
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("id");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const [visible, setVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const { users, loading, error, paginatorInfo } = useUsersQuery({
    role: ERole.ROLE_TEACHER,
    name: searchTerm,
    page,
    orderBy,
    sortedBy,
  });

  if (loading) return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  function handlePagination(current: number) {
    setPage(current);
  }

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    setPage(1);
  }

  function toggleVisible() {
    setVisible((v) => !v);
  }

  return (
    <>
      <PageBreadcrumb pageTitle="Teacher Payment Report" />
      <Card className="mb-8 flex flex-col">
        <div className="flex w-full flex-col items-center md:flex-row">
          <div className="flex w-full gap-5 flex-row items-center ms-auto md:w-2/4">
            <Search
              onSearch={handleSearch}
              placeholderText="Search by Teacher Name"
            />
          </div>

          <button
            className="mt-5 flex items-center whitespace-nowrap text-base font-semibold text-accent md:mt-0 md:ms-5 dark:text-white/90"
            onClick={toggleVisible}
          >
            Filters
            {visible ? (
              <ArrowUp className="ms-2" />
            ) : (
              <ArrowDown className="ms-2" />
            )}
          </button>
        </div>
      </Card>
      <div className="space-y-6">
        <TeacherReportDataList
          reportData={users}
          paginatorInfo={paginatorInfo}
          onPagination={handlePagination}
          onOrder={setOrder}
          onSort={setColumn}
        />
      </div>
    </>
  );
}
