import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Loader from "../../components/ui/loader/loader";
import ErrorMessage from "../../components/ui/error-message";
import { useState } from "react";
import { EGrade, SortOrder } from "../../types";
import { useStudentsQuery } from "../../data/student";
import StudentList from "../../components/student/student-list";
import Card from "@components/common/card";
import Search from "@components/common/search";
import { ArrowUp } from "@components/icons/arrow-up";
import { ArrowDown } from "@components/icons/arrow-down";
import cn from "classnames";
import UserFilter from "@components/user/user-filter";

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("");
  const [grade, setGrade] = useState<EGrade | null>(null);
  const [admissionPayed, setAdmissionPayed] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("id");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const { students, loading, error, paginatorInfo } = useStudentsQuery({
    grade: grade,
    admissionPayed: admissionPayed,
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
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Students" />
      <Card className="mb-8 flex flex-col">
        <div className="flex w-full flex-col items-center md:flex-row">
          <div className="flex w-full flex-row items-center ms-auto md:w-2/4">
            <Search
              onSearch={handleSearch}
              placeholderText="Search by Subject Name"
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
        <div
          className={cn("flex w-full transition", {
            "visible h-auto": visible,
            "invisible h-0": !visible,
          })}
        >
          <div className="mt-5 flex w-full flex-col border-t border-gray-200 pt-5 md:mt-8 md:flex-row md:items-center md:pt-8">
            <UserFilter
              className="w-full"
              onGradeFilter={(object: any) => {
                setGrade(object?.value);
                setPage(1);
              }}
              onAdmissionPayedFilter={(object: any) => {
                setAdmissionPayed(object?.value);
                setPage(1);
              }}
              enableGrade
              enableAdmissionFilter
            />
          </div>
        </div>
      </Card>
      <div className="space-y-6">
        <StudentList
          students={students}
          paginatorInfo={paginatorInfo}
          onPagination={handlePagination}
          onOrder={setOrder}
          onSort={setColumn}
        />
      </div>
    </>
  );
}
