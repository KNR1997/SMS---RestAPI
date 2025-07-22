import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Loader from "../../components/ui/loader/loader";
import ErrorMessage from "../../components/ui/error-message";
import { Fragment, useState } from "react";
import { SortOrder } from "../../types";
import { useSubjectsQuery } from "../../data/subject";
import SubjectList from "../../components/subject/subject-list";
import { Card, Menu } from "antd";
import Search from "@components/common/search";
import { DownloadIcon, MoreDotIcon } from "icons";
import { Transition } from "@headlessui/react";
import classNames from "classnames";
import { ArrowUp } from "@components/icons/arrow-up";
import { ArrowDown } from "@components/icons/arrow-down";

export default function Subjects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("id");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const { subjects, loading, error, paginatorInfo } = useSubjectsQuery({
    name: searchTerm,
    page,
    orderBy,
    sortedBy,
  });

  if (loading) return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    setPage(1);
  }

  function handlePagination(current: number) {
    setPage(current);
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
      <PageBreadcrumb pageTitle="Subjects" />
      <Card className="mb-8 flex flex-col">
        <div className="flex w-full flex-col items-center md:flex-row">
          <div className="flex w-full flex-row items-center ms-auto md:w-2/4">
            <Search
              onSearch={handleSearch}
              placeholderText="Search by Subject Name"
            />
          </div>
        </div>
      </Card>
      <div className="space-y-6">
        <SubjectList
          subjects={subjects}
          paginatorInfo={paginatorInfo}
          onPagination={handlePagination}
          onOrder={setOrder}
          onSort={setColumn}
        />
      </div>
    </>
  );
}
