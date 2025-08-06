import { ActionType, ERole, MappedPaginatorInfo, User } from "../../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Pagination from "../ui/pagination";
import Badge from "@components/ui/badge/Badge";
import {
  useDeleteUserMutation,
  useDisableUserMutation,
  useEnableUserMutation,
  useResetUserPasswordMutation,
} from "@data/user";
import ConfirmationModal from "@components/common/confirmation-modal";
import { useState } from "react";
import ActionButtons from "@components/common/action-buttons";
import { useModal } from "../../hooks/useModal";

export type IProps = {
  users: User[];
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (key: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};

export default function UserList({
  users,
  onPagination,
  paginatorInfo,
}: IProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedRecord, setSelectedRecord] = useState<{
    id: number;
    action: ActionType;
  } | null>(null);
  const { mutate: enableUser } = useEnableUserMutation();
  const { mutate: disableUser } = useDisableUserMutation();
  const { mutate: deleteUser } = useDeleteUserMutation();
  const { mutate: resetPassword } = useResetUserPasswordMutation();

  const handleActionClick = (id: number, action: ActionType) => {
    openModal();
    setSelectedRecord({ id, action });
  };

  const handleModalClick = () => {
    if (!selectedRecord) return;
    if (selectedRecord.action == ActionType.ENABLE) {
      enableUser({ id: selectedRecord.id });
    } else if (selectedRecord.action == ActionType.DISABLE) {
      disableUser({ id: selectedRecord.id });
    } else if (selectedRecord.action == ActionType.DELETE) {
      deleteUser({ id: selectedRecord.id });
    } else if (selectedRecord.action == ActionType.RESET_PASSWORD) {
      resetPassword({ id: selectedRecord.id });
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
                {/* <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Username
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
                  Role
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>

                {/* <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Email
              </TableCell> */}
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
              {users.map((user) => (
                <TableRow key={user.id}>
                  {/* <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user.id}
                </TableCell> */}
                  {/* <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user.username}
                </TableCell> */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        user.role == ERole.ROLE_ADMIN
                          ? "success"
                          : user.role === ERole.ROLE_TEACHER
                          ? "warning"
                          : user.role === ERole.ROLE_RECEPTIONIST
                          ? "dark"
                          : "primary"
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={user.active ? "success" : "warning"}
                    >
                      {user?.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  {/* <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user.email}
                </TableCell> */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <ActionButtons
                      id={user.id}
                      editUrl={`/users/${user.id}/edit`}
                      isActive={user.active}
                      enableDisableButton
                      onEnableDisableClick={handleActionClick}
                      enableDelete
                      onDeleteClick={handleActionClick}
                      enablePasswordReset
                      onPasswordResetClick={handleActionClick}
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
        title={`${selectedRecord?.action
          .toLowerCase()
          .replace(/^\w/, (c) => c.toUpperCase())} User`}
        description={`Are you sure you want to ${selectedRecord?.action.toLowerCase()} this user?`}
        onConfirm={handleModalClick}
        onCancel={closeModal}
        confirmColor={
          selectedRecord?.action === ActionType.ENABLE ? "green" : "red"
        }
      />
    </>
  );
}
