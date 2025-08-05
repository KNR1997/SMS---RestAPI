import { ActionType, Exam, ExamStatusType, MappedPaginatorInfo } from "@types";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import Pagination from "@components/ui/pagination";
import Badge from "@components/ui/badge/Badge";
import ConfirmationModal from "@components/common/confirmation-modal";
import ActionButtons from "@components/common/action-buttons";
import { useState } from "react";
import {
  useDeleteExamMutation,
  useDisableExamMutation,
  useEnableExamMutation,
} from "@data/exam";
import { useModal } from "../../hooks/useModal";
import { useAuth } from "../../context/AuthContext";
import { adminOnly, hasAccess } from "../../utils/auth-utils";

export type IProps = {
  exams: Exam[];
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (key: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
  showActions?: boolean;
};

export default function ExamList({
  exams,
  onPagination,
  paginatorInfo,
  showActions = true,
}: IProps) {
    const { user } = useAuth();
    let has_permission = hasAccess(adminOnly, user?.erole);
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedRecord, setSelectedRecord] = useState<{
    id: number;
    action: ActionType;
  } | null>(null);
  const { mutate: enableExam } = useEnableExamMutation();
  const { mutate: disableExam } = useDisableExamMutation();
  const { mutate: deleteExam } = useDeleteExamMutation();

  const handleActionClick = (id: number, action: ActionType) => {
    openModal();
    setSelectedRecord({ id, action });
  };

  const handleModalClick = () => {
    if (!selectedRecord) return;
    if (selectedRecord.action == ActionType.ENABLE) {
      enableExam({ id: selectedRecord.id });
    } else if (selectedRecord.action == ActionType.DISABLE) {
      disableExam({ id: selectedRecord.id });
    } else if (selectedRecord.action == ActionType.DELETE) {
      deleteExam({ id: selectedRecord.id });
    }
    closeModal();
  };

  const handleEnterExamResults = (id: number) => {
    // navigate(`/exams/${id}/results`);
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
                  Course
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
                  Active/Inactive
                </TableCell>
                {showActions && (
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Actions
                  </TableCell>
                )}
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {exams.map((exam) => (
                <TableRow key={exam.id}>
                  {/* <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {exam.id}
                </TableCell> */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {exam.courseName}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        exam.status === ExamStatusType.COMPLETED
                          ? "success"
                          : exam.status === ExamStatusType.PENDING
                          ? "warning"
                          : "error"
                      }
                    >
                      {exam.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={exam.active ? "success" : "warning"}
                    >
                      {exam?.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  {showActions && (
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <ActionButtons
                        id={exam.id}
                        enableEdit={has_permission}
                        editUrl={`/exams/${exam.id}/edit`}
                        isActive={exam.active}
                        enableDisableButton={has_permission}
                        onEnableDisableClick={handleActionClick}
                        enableDelete={has_permission}
                        onDeleteClick={handleActionClick}
                        enableExamResult={true}
                      />
                      {/* <button onClick={() => handleEdit(exam.id)}>
                      <PencilIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
                    </button>
                    <button onClick={() => handleEnterExamResults(exam.id)}>
                      <BoltIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
                    </button> */}
                    </TableCell>
                  )}
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
        title={`${selectedRecord?.action
          .toLowerCase()
          .replace(/^\w/, (c) => c.toUpperCase())} Exam`}
        description={`Are you sure you want to ${selectedRecord?.action.toLowerCase()} this exam?`}
        onConfirm={handleModalClick}
        onCancel={closeModal}
        confirmColor={
          selectedRecord?.action === ActionType.ENABLE ? "green" : "red"
        }
      />
    </>
  );
}
