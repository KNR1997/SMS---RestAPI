import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import Loader from "@components/ui/loader/loader";
import ErrorMessage from "@components/ui/error-message";
import { useState } from "react";
import { SortOrder } from "../../types";
import { useGuardiansQuery } from "../../data/guardian";
import GuardianList from "@components/guardian/guardian-list";
import Card from "@components/common/card";
import Search from "@components/common/search";

export default function Guardians() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrder] = useState("id");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const { guardians, loading, error, paginatorInfo } = useGuardiansQuery({
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

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Guardians" />
      <Card className="mb-8 flex flex-col">
        <div className="flex w-full flex-col items-center md:flex-row">
          <div className="flex w-full flex-row items-center ms-auto md:w-2/4">
            <Search
              onSearch={handleSearch}
              placeholderText="Search by Name or NIC"
            />
          </div>
        </div>
      </Card>
      <div className="space-y-6">
        <GuardianList
          guardians={guardians}
          paginatorInfo={paginatorInfo}
          onPagination={handlePagination}
          onOrder={setOrder}
          onSort={setColumn}
        />
      </div>
    </>
  );
}
