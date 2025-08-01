import { ActionType, Hall, MappedPaginatorInfo } from "@types";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import Pagination from "@components/ui/pagination";
import {
  useDeleteHallMutation,
  useDisableHallMutation,
  useEnableHallMutation,
} from "@data/hall";
import { useModal } from "../../hooks/useModal";
import { useState } from "react";
import ActionButtons from "@components/common/action-buttons";
import ConfirmationModal from "@components/common/confirmation-modal";
import Badge from "@components/ui/badge/Badge";

export type IProps = {
  halls: Hall[];
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (key: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
  showActions?: boolean;
};

export default function HallList({
  halls,
  onPagination,
  paginatorInfo,
  showActions = true,
}: IProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedRecord, setSelectedRecord] = useState<{
    id: number;
    action: ActionType;
  } | null>(null);
  const { mutate: enableHall } = useEnableHallMutation();
  const { mutate: disableHall } = useDisableHallMutation();
  const { mutate: deleteHall } = useDeleteHallMutation();

  const handleActionClick = (id: number, action: ActionType) => {
    openModal();
    setSelectedRecord({ id, action });
  };

  const handleModalClick = () => {
    if (!selectedRecord) return;
    if (selectedRecord.action == ActionType.ENABLE) {
      enableHall({ id: selectedRecord.id });
    } else if (selectedRecord.action == ActionType.DISABLE) {
      disableHall({ id: selectedRecord.id });
    } else if (selectedRecord.action == ActionType.DELETE) {
      deleteHall({ id: selectedRecord.id });
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
                  Id
                </TableCell>
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
                  Exam Capacity
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Lecture Capacity
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableRow>
                  {/* ... other headers */}
                  {showActions && (
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Actions
                    </TableCell>
                  )}
                </TableRow>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {halls.map((hall) => (
                <TableRow key={hall.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {hall.id}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {hall.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {hall.examCapacity}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {hall.lectureCapacity}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={hall.active ? "success" : "warning"}
                    >
                      {hall?.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableRow key={hall.id}>
                    {/* ... other cells */}
                    {showActions && (
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <ActionButtons
                          id={hall.id}
                          editUrl={`/halls/${hall.id}/edit`}
                          isActive={hall.active}
                          enableDisableButton
                          onEnableDisableClick={handleActionClick}
                          enableDelete
                          onDeleteClick={handleActionClick}
                        />
                      </TableCell>
                    )}
                  </TableRow>
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
          .replace(/^\w/, (c) => c.toUpperCase())} Hall`}
        description={`Are you sure you want to ${selectedRecord?.action.toLowerCase()} this hall?`}
        onConfirm={handleModalClick}
        onCancel={closeModal}
        confirmColor={
          selectedRecord?.action === ActionType.ENABLE ? "green" : "red"
        }
      />
    </>
  );
}
