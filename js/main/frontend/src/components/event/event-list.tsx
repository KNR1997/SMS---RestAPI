import {
  ActionType,
  Event,
  EventStatusType,
  EventType,
  MappedPaginatorInfo,
} from "@types";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import Pagination from "@components/ui/pagination";
import Badge from "@components/ui/badge/Badge";
import {
  useDeleteEventMutation,
  useDisableEventMutation,
  useEnableEventMutation,
} from "@data/event";
import { useModal } from "../../hooks/useModal";
import { useState } from "react";
import ActionButtons from "@components/common/action-buttons";
import ConfirmationModal from "@components/common/confirmation-modal";

export type IProps = {
  events: Event[];
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (key: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
  showActions?: boolean;
};

export default function EventList({
  events,
  onPagination,
  paginatorInfo,
  showActions = true,
}: IProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedRecord, setSelectedRecord] = useState<{
    id: number;
    action: ActionType;
  } | null>(null);
  const { mutate: enableEvent } = useEnableEventMutation();
  const { mutate: disableEvent } = useDisableEventMutation();
  const { mutate: deleteEvent } = useDeleteEventMutation();

  const handleActionClick = (id: number, action: ActionType) => {
    openModal();
    setSelectedRecord({ id, action });
  };

  const handleModalClick = () => {
    if (!selectedRecord) return;
    if (selectedRecord.action == ActionType.ENABLE) {
      enableEvent({ id: selectedRecord.id });
    } else if (selectedRecord.action == ActionType.DISABLE) {
      disableEvent({ id: selectedRecord.id });
    } else if (selectedRecord.action == ActionType.DELETE) {
      deleteEvent({ id: selectedRecord.id });
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
                  Code
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Type
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Date
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Start time
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  End time
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
              {events.map((event) => (
                <TableRow key={event.id}>
                  {/* <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {event.id}
                </TableCell> */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {event.code}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        event.eventType == EventType.EXAM
                          ? "warning"
                          : "success"
                      }
                    >
                      {event.eventType}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {event.date}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {event.startTime}
                  </TableCell>{" "}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {event.endTime}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        event.status === EventStatusType.COMPLETED
                          ? "success"
                          : event.status === EventStatusType.PENDING
                          ? "warning"
                          : "error"
                      }
                    >
                      {event.status}
                    </Badge>
                  </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={event.active ? "success" : "warning"}
                    >
                      {event?.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  {/* ... other cells */}
                  {showActions && (
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <ActionButtons
                        id={event.id}
                        editUrl={`/events/${event.id}/edit`}
                        isActive={event.active}
                        enableDisableButton
                        onEnableDisableClick={handleActionClick}
                        enableDelete
                        onDeleteClick={handleActionClick}
                      />
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
          .replace(/^\w/, (c) => c.toUpperCase())} Event`}
        description={`Are you sure you want to ${selectedRecord?.action.toLowerCase()} this event?`}
        onConfirm={handleModalClick}
        onCancel={closeModal}
        confirmColor={
          selectedRecord?.action === ActionType.ENABLE ? "green" : "red"
        }
      />
    </>
  );
}
