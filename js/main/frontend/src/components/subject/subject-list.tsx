import { ActionType, MappedPaginatorInfo, Subject } from "../../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Pagination from "../ui/pagination";
import { useModal } from "../../hooks/useModal";
import {
  useDeleteSubjectMutation,
  useDisableSubjectMutation,
  useEnableSubjectMutation,
} from "@data/subject";
import { useState } from "react";
import Badge from "@components/ui/badge/Badge";
import ConfirmationModal from "@components/common/confirmation-modal";
import ActionButtons from "@components/common/action-buttons";

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
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedSubject, setSelectedSubject] = useState<{
    subjectId: number;
    action: ActionType;
  } | null>(null);
  const { mutate: disableSubject } = useDisableSubjectMutation();
  const { mutate: enableSubject } = useEnableSubjectMutation();
  const { mutate: deleteSubject } = useDeleteSubjectMutation();

  const handleActionClick = (subjectId: number, action: ActionType) => {
    openModal();
    setSelectedSubject({ subjectId, action });
  };

  const handleModalClick = () => {
    if (!selectedSubject) return;
    if (selectedSubject.action == ActionType.ENABLE) {
      enableSubject({ id: selectedSubject.subjectId });
    } else if (selectedSubject.action == ActionType.DISABLE) {
      disableSubject({ id: selectedSubject.subjectId });
    } else if (selectedSubject.action == ActionType.DELETE) {
      deleteSubject({ id: selectedSubject.subjectId });
    }
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
                    <ActionButtons
                      id={subject.id}
                      editUrl={`/subjects/${subject.slug}/edit`}
                      isActive={subject.active}
                      enableDisableButton
                      onEnableDisableClick={handleActionClick}
                      enableDelete
                      onDeleteClick={handleActionClick}
                    />
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
      <ConfirmationModal
        isOpen={isOpen}
        title={`${selectedSubject?.action
          .toLowerCase()
          .replace(/^\w/, (c) => c.toUpperCase())} Subject`}
        description={`Are you sure you want to ${selectedSubject?.action.toLowerCase()} this subject?`}
        onConfirm={handleModalClick}
        onCancel={closeModal}
        confirmColor={
          selectedSubject?.action === ActionType.ENABLE ? "green" : "red"
        }
      />
    </>
  );
}
