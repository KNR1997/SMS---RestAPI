import { ActionType, Course, MappedPaginatorInfo } from "@types";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import Pagination from "@components/ui/pagination";
import { useModal } from "../../hooks/useModal";
import { useState } from "react";
import ConfirmationModal from "@components/common/confirmation-modal";
import ActionButtons from "@components/common/action-buttons";
import {
  useDeleteCourseMutation,
  useDisableCourseMutation,
  useEnableCourseMutation,
} from "@data/course";
import Badge from "@components/ui/badge/Badge";

export type IProps = {
  courses: Course[];
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (key: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
  showActions?: boolean;
};

export default function CourseList({
  courses,
  onPagination,
  paginatorInfo,
  showActions = true,
}: IProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedRecord, setSelectedRecord] = useState<{
    id: number;
    action: ActionType;
  } | null>(null);
  const { mutate: enableCourse } = useEnableCourseMutation();
  const { mutate: disableCourse } = useDisableCourseMutation();
  const { mutate: deleteCourse } = useDeleteCourseMutation();

  const handleActionClick = (id: number, action: ActionType) => {
    openModal();
    setSelectedRecord({ id, action });
  };

  const handleModalClick = () => {
    if (!selectedRecord) return;
    if (selectedRecord.action == ActionType.ENABLE) {
      enableCourse({ id: selectedRecord.id });
    } else if (selectedRecord.action == ActionType.DISABLE) {
      disableCourse({ id: selectedRecord.id });
    } else if (selectedRecord.action == ActionType.DELETE) {
      deleteCourse({ id: selectedRecord.id });
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
                  Name
                </TableCell>
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
                  Grade
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Fee
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
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
              {courses.map((course) => (
                <TableRow key={course.id}>
                  {/* <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {course.id}
                </TableCell> */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {course.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {course.code}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {course.gradeType}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    Rs. {course.fee}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={course.active ? "success" : "warning"}
                    >
                      {course?.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  {showActions && (
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <ActionButtons
                        id={course.id}
                        editUrl={`/courses/${course.slug}/edit`}
                        isActive={course.active}
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
          .replace(/^\w/, (c) => c.toUpperCase())} Course`}
        description={`Are you sure you want to ${selectedRecord?.action.toLowerCase()} this subject?`}
        onConfirm={handleModalClick}
        onCancel={closeModal}
        confirmColor={
          selectedRecord?.action === ActionType.ENABLE ? "green" : "red"
        }
      />
    </>
  );
}
