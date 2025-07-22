import cn from "classnames";
import Label from "@components/ui/label";
import { ActionMeta } from "react-select";
import Select from "@components/ui/select/select";
import {
  admissionPayedOptions,
  gradeOptions,
  roleOptions,
} from "../../constants/role";

type Props = {
  className?: string;
  onGradeFilter?: (newValue: any, actionMeta: ActionMeta<unknown>) => void;
  onAdmissionPayedFilter?: (
    newValue: any,
    actionMeta: ActionMeta<unknown>
  ) => void;
  onRoleFilter?: (newValue: any, actionMeta: ActionMeta<unknown>) => void;
  enableGrade?: boolean;
  enableRoleFilter?: boolean;
  enableAdmissionFilter?: boolean;
};

export default function UserFilter({
  className,
  onGradeFilter,
  onAdmissionPayedFilter,
  onRoleFilter,
  enableGrade,
  enableRoleFilter,
  enableAdmissionFilter,
}: Props) {
  return (
    <div
      className={cn(
        "flex w-full flex-col space-y-5 rtl:space-x-reverse md:flex-row md:items-end md:space-x-5 md:space-y-0",
        className
      )}
    >
      {enableRoleFilter && (
        <div className="w-full">
          <Label>Role</Label>
          <Select
            options={roleOptions}
            getOptionLabel={(option: any) => option.label}
            getOptionValue={(option: any) => option.value}
            // placeholder={t("common:filter-by-group-placeholder")}
            onChange={onRoleFilter}
            isClearable={true}
          />
        </div>
      )}
      {enableGrade && (
        <div className="w-full">
          <Label>Grade</Label>
          <Select
            options={gradeOptions}
            getOptionLabel={(option: any) => option.label}
            getOptionValue={(option: any) => option.value}
            // placeholder={t("common:filter-by-group-placeholder")}
            onChange={onGradeFilter}
            isClearable={true}
          />
        </div>
      )}
      {enableAdmissionFilter && (
        <div className="w-full">
          <Label>Admission Payed</Label>
          <Select
            options={admissionPayedOptions}
            getOptionLabel={(option: any) => option.label}
            getOptionValue={(option: any) => option.value}
            // placeholder={t("common:filter-by-group-placeholder")}
            onChange={onAdmissionPayedFilter}
            isClearable={true}
          />
        </div>
      )}
    </div>
  );
}
