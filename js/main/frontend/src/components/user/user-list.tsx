import { useNavigate } from "react-router";
import { PencilIcon, BoltIcon } from "../../icons";
import { ERole, MappedPaginatorInfo, User } from "../../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Pagination from "../ui/pagination";
import Badge from "@components/ui/badge/Badge";
import { useResetUserPasswordMutation } from "@data/user";

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
  const navigate = useNavigate();

  const handleEdit = (id: number) => {
    navigate(`/users/${id}/edit`);
  };

  const { mutate: resetPassword } = useResetUserPasswordMutation();

  return (
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
                {/* <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user.email}
                </TableCell> */}
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <button onClick={() => handleEdit(user.id)} className="pr-1">
                    <PencilIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
                  </button>
                  <button onClick={() => resetPassword({ id: user.id })}>
                    <BoltIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
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
