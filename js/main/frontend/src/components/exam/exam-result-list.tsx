import { PencilIcon } from "../../icons";
import { ExamResult, MappedPaginatorInfo } from "@types";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import Pagination from "@components/ui/pagination";
import { Modal } from "@components/ui/modal";
import Button from "@components/ui/button/Button";
import { useModal } from "../../hooks/useModal";
import { useForm } from "react-hook-form";
import Label from "@components/form/Label";
import Input from "@components/form/input/InputField";
import { useUpdateExamResultMutation } from "@data/examResult";

type FormValues = {
  id: number;
  studentName: string;
  result: string;
};

export type IProps = {
  examResults: ExamResult[];
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (key: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
  showActions?: boolean;
};

export default function ExamResultList({
  examResults,
  onPagination,
  paginatorInfo,
  showActions = true,
}: IProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const { mutate: updateExamResult } = useUpdateExamResultMutation();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({});

  const onSubmit = async (values: FormValues) => {
    const input = {
      result: values.result,
    };
    updateExamResult({ id: values.id, ...input });
    closeModal();
  };

  const handleEditResult = (examResult: ExamResult) => {
    setValue("id", examResult.id);
    setValue("studentName", examResult.studentName);
    setValue("result", examResult.result);
    openModal();
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
                  Student ID
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Student Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Result
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
              {examResults.map((examResult) => (
                <TableRow key={examResult.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {examResult.studentId}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {examResult.studentName}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {examResult.result}
                  </TableCell>
                  {showActions && (
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <button onClick={() => handleEditResult(examResult)}>
                        <PencilIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
                      </button>
                      {/* <button
                      onClick={() => handleEnterExamResults(examResult.id)}
                    >
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
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Exam Result
              </h4>
              <div>
                <Label>
                  Student Name <span className="text-error-500">*</span>{" "}
                </Label>
                <Input
                  disabled
                  {...register("studentName")}
                  errorMessage={errors.studentName?.message!}
                />
              </div>
              <div>
                <Label>
                  Result <span className="text-error-500">*</span>{" "}
                </Label>
                <Input
                  {...register("result")}
                  errorMessage={errors.result?.message!}
                />
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm">Update</Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
