import { useNavigate } from "react-router";
import { PencilIcon } from "../../icons";
import { MappedPaginatorInfo, Student } from "../../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Pagination from "../ui/pagination";
import Badge from "../ui/badge/Badge";

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
  const navigate = useNavigate();

  // console.log("students: ", students);

  const handleEdit = (id: number) => {
    navigate(`/students/${id}/edit`);
  };

  return (
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
                Grade
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                StudentID
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
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {student.id}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {student.firstName} {student.lastName}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {student?.gradeType ? student.gradeType : "_"}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {student.studentId}
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
                  <button onClick={() => handleEdit(student.id)}>
                    <PencilIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
                  </button>
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
  );
}
