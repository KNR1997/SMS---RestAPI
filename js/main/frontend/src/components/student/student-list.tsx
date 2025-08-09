import { ActionType, MappedPaginatorInfo, Student } from "../../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Pagination from "../ui/pagination";
import Badge from "../ui/badge/Badge";
import ConfirmationModal from "@components/common/confirmation-modal";
import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import {
  useDeleteStudentMutation,
  useDisableStudentMutation,
  useEnableStudentMutation,
} from "@data/student";
import ActionButtons from "@components/common/action-buttons";
import { adminAndReceptionistOnly, adminOnly, hasAccess } from "../../utils/auth-utils";
import { useAuth } from "../../context/AuthContext";
import StudentPopup from "./student-popup";
import { useResetUserPasswordMutation } from "@data/user";

export type IProps = {
  students: Student[];
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (key: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};

export default function StudentList({
  students,
  onPagination,
  paginatorInfo,
}: IProps) {
  const { user } = useAuth();
  let has_permission = hasAccess(adminAndReceptionistOnly, user?.erole);
  const { isOpen, openModal, closeModal } = useModal();
  const [openStudentPopup, setOpenStudentPopup] = useState(false);
  const [popupData, setPopupData] = useState<Student | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<{
    id: number;
    action: ActionType;
  } | null>(null);
  const { mutate: enableStudent } = useEnableStudentMutation();
  const { mutate: disableStudent } = useDisableStudentMutation();
  const { mutate: deleteStudent } = useDeleteStudentMutation();
  const { mutate: resetPassword } = useResetUserPasswordMutation();

  const handleActionClick = (id: number, action: ActionType) => {
    openModal();
    setSelectedRecord({ id, action });
  };

  const handleModalClick = () => {
    if (!selectedRecord) return;
    if (selectedRecord.action == ActionType.ENABLE) {
      enableStudent({ id: selectedRecord.id });
    } else if (selectedRecord.action == ActionType.DISABLE) {
      disableStudent({ id: selectedRecord.id });
    } else if (selectedRecord.action == ActionType.DELETE) {
      deleteStudent({ id: selectedRecord.id });
    } else if (selectedRecord.action == ActionType.RESET_PASSWORD) {
      resetPassword({ id: selectedRecord.id });
    }
    closeModal();
  };

  const handlePopupClick = (data: any) => {
    setPopupData(data);
    setOpenStudentPopup(true);
  };

  const closeStudentPopup = () => {
    setOpenStudentPopup(false);
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
                  Username
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Student Number
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Grade
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Admission Payed
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
              {students.map((student) => (
                <TableRow key={student.id}>
                  {/* <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {student.id}
                </TableCell> */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {student.firstName} {student.lastName}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {student.username}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {student.studentId}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {student?.gradeType ? student.gradeType : "_"}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {student.admissionPayed}
                    <Badge
                      size="sm"
                      color={student.admissionPayed ? "success" : "warning"}
                    >
                      {student.admissionPayed ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={student.active ? "success" : "warning"}
                    >
                      {student?.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <ActionButtons
                      id={student.id}
                      enableEdit={has_permission}
                      editUrl={`/students/${student.id}/edit`}
                      isActive={student.active}
                      enableDisableButton={has_permission}
                      onEnableDisableClick={handleActionClick}
                      enableDelete={has_permission}
                      onDeleteClick={handleActionClick}
                      enablePopup={!has_permission}
                      data={student}
                      onPopupClick={handlePopupClick}
                      enablePasswordReset={has_permission}
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
          .replace(/^\w/, (c) => c.toUpperCase())} Student`}
        description={`Are you sure you want to ${selectedRecord?.action.toLowerCase()} this student?`}
        onConfirm={handleModalClick}
        onCancel={closeModal}
        confirmColor={
          selectedRecord?.action === ActionType.ENABLE ? "green" : "red"
        }
      />
      <StudentPopup
        isOpen={openStudentPopup}
        title="Student Details"
        data={popupData?.guardian}
        // description={`Guardian Details ${popupData?.guardian?.firstName}`}
        onConfirm={handleModalClick}
        onCancel={closeStudentPopup}
        confirmColor={
          selectedRecord?.action === ActionType.ENABLE ? "green" : "red"
        }
      />
    </>
  );
}
