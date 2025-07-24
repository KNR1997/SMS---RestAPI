import { useNavigate } from "react-router";
import { PencilIcon, BanIcon } from "../../icons";
import { MappedPaginatorInfo, Subject } from "../../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Pagination from "../ui/pagination";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { useModal } from "../../hooks/useModal";
import { useDisableSubjectMutation } from "@data/subject";
import { useState } from "react";
import Badge from "@components/ui/badge/Badge";

export type IProps = {
  subjects: Subject[];
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (key: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};

export default function SubjectList({
  subjects,
  onPagination,
  paginatorInfo,
}: IProps) {
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  const [disableSubjectId, setDisableSubjectId] = useState<number | null>(null);
  const { mutate: disableSubject } = useDisableSubjectMutation();

  const handleEdit = (slug: string) => {
    navigate(`/subjects/${slug}/edit`);
  };

  const handleBanIconClick = (id: number) => {
    openModal();
    setDisableSubjectId(id);
  };

  const handleDisable = () => {
    if (disableSubjectId) disableSubject({ id: disableSubjectId });
    closeModal();
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {/* <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Id
              </TableCell> */}
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {subjects.map((subject) => (
                <TableRow key={subject.id}>
                  {/* <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {subject.id}
                </TableCell> */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {subject.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={subject.active ? "success" : "warning"}
                    >
                      {subject?.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <button onClick={() => handleEdit(subject.slug)}>
                      <PencilIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
                    </button>
                    <button onClick={() => handleBanIconClick(subject.id)}>
                      <BanIcon className="text-red-400 hover:text-gray-700 dark:hover:text-red-300 size-6" />
                    </button>
                    {/* <button onClick={() => handleDeleteIconClick(subject.id)}>
                      <TrashBinIcon className="text-red-400 hover:text-gray-700 dark:hover:text-red-300 size-6" />
                    </button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!!paginatorInfo?.total && (
            <div className="flex items-center justify-end pb-2">
              <Pagination
                total={paginatorInfo.total}
                current={paginatorInfo.currentPage}
                pageSize={paginatorInfo.perPage}
                onChange={onPagination}
              />
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Delete Subject
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Are you sure want to delete this Subject?
            </p>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" variant="outline">
              Close
            </Button>
            <Button
              onClick={() => handleDisable()}
              size="sm"
              className="bg-red-500 hover:bg-red-700"
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
