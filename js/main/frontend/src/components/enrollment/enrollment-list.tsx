import Badge from "@components/ui/badge/Badge";
import Pagination from "@components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import {
  useDeleteEnrollmentMutation,
  useDisableEnrollmentMutation,
  useEnableEnrollmentMutation,
  useInvokeEnrollmentMutation,
} from "@data/enrollment";
import {
  ActionType,
  EEnrollmentStatus,
  Enrollment,
  MappedPaginatorInfo,
} from "@types";
import { useModal } from "../../hooks/useModal";
import { useState } from "react";
import ActionButtons from "@components/common/action-buttons";
import ConfirmationModal from "@components/common/confirmation-modal";

export type IProps = {
  enrollments: Enrollment[];
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (key: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
  showActions?: boolean;
};

export default function EnrollmentList({
  enrollments,
  onPagination,
  paginatorInfo,
  showActions = true,
}: IProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedRecord, setSelectedRecord] = useState<{
    id: number;
    action: ActionType;
  } | null>(null);
  const { mutate: enableEnrollment } = useEnableEnrollmentMutation();
  const { mutate: disableEnrollment } = useDisableEnrollmentMutation();
  const { mutate: deleteEnrollment } = useDeleteEnrollmentMutation();

  const handleActionClick = (id: number, action: ActionType) => {
    openModal();
    setSelectedRecord({ id, action });
  };

  const handleModalClick = () => {
    if (!selectedRecord) return;
    if (selectedRecord.action == ActionType.ENABLE) {
      enableEnrollment({ id: selectedRecord.id });
    } else if (selectedRecord.action == ActionType.DISABLE) {
      disableEnrollment({ id: selectedRecord.id });
    } else if (selectedRecord.action == ActionType.DELETE) {
      deleteEnrollment({ id: selectedRecord.id });
    }
    closeModal();
  };

  const { mutate: invokeEnrollment } = useInvokeEnrollmentMutation();

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
                  Student
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Course Name
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
              {enrollments.map((enrollment) => (
                <TableRow key={enrollment.id}>
                  {/* <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {enrollment.id}
                </TableCell> */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {enrollment.studentName}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {enrollment.courseName}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        enrollment.status == EEnrollmentStatus.ACTIVE
                          ? "success"
                          : enrollment.status === EEnrollmentStatus.LOCKED
                          ? "warning"
                          : "error"
                      }
                    >
                      {enrollment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={enrollment.active ? "success" : "warning"}
                    >
                      {enrollment?.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  {showActions && (
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <ActionButtons
                        id={enrollment.id}
                        editUrl={`/enrollments/${enrollment.id}/view`}
                        isActive={enrollment.active}
                        enableDisableButton
                        onEnableDisableClick={handleActionClick}
                        enableDelete
                        onDeleteClick={handleActionClick}
                      />
                      {/* <button>
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
          .replace(/^\w/, (c) => c.toUpperCase())} Enrollment`}
        description={`Are you sure you want to ${selectedRecord?.action.toLowerCase()} this enrollment?`}
        onConfirm={handleModalClick}
        onCancel={closeModal}
        confirmColor={
          selectedRecord?.action === ActionType.ENABLE ? "green" : "red"
        }
      />
    </>
  );
}
