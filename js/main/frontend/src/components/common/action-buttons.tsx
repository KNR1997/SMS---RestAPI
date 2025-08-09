import { ActionType } from "@types";
import {
  PencilIcon,
  BanIcon,
  BoltIcon,
  TrashBinIcon,
  Refresh,
  EyeIcon,
  APlus,
} from "../../icons";
import { useNavigate } from "react-router";

type Props = {
  id: number;
  data?: any;
  editUrl?: string;
  enableEdit?: boolean;
  enableDisableButton?: boolean;
  isActive?: boolean;
  enableDelete?: boolean;
  onEnableDisableClick: (id: number, action: ActionType) => void;
  onDeleteClick?: (id: number, action: ActionType) => void;
  enablePasswordReset?: boolean;
  //onPasswordResetClick?: ({ id }: { id: number }) => void;
  onPasswordResetClick: (id: number, action: ActionType) => void;
  enablePopup?: boolean;
  onPopupClick?: (data: any) => void;
  enableExamResult?: boolean;
};

const ActionButtons = ({
  id,
  data,
  enableEdit = true,
  editUrl,
  enableDisableButton,
  enableDelete,
  isActive,
  onEnableDisableClick,
  onDeleteClick,
  enablePasswordReset,
  onPasswordResetClick,
  enablePopup,
  onPopupClick,
  enableExamResult = false,
}: Props) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    if (!editUrl) return;
    navigate(editUrl);
  };

  const handleExamResultAdd = () => {
    navigate(`/exams/${id}/results`);
  };

  return (
    <div>
      {enablePasswordReset && onPasswordResetClick && (
        <button
          title="Reset password to 123456"
          onClick={() => onPasswordResetClick(id, ActionType.RESET_PASSWORD)}
        >
          <Refresh className="text-blue-400 mr-2 hover:text-gray-700 dark:blue:text-red-300 size-5" />
        </button>
      )}
      {enableExamResult && (
        <button title="Enter Exam results" onClick={() => handleExamResultAdd()}>
          <APlus className="size-6 mr-2" />
        </button>
      )}
      {enableDisableButton &&
        (isActive ? (
          <button title="Disable" onClick={() => onEnableDisableClick(id, ActionType.DISABLE)}>
            <BanIcon className="text-red-400 mr-2 hover:text-gray-700 dark:hover:text-red-300 size-6" />
          </button>
        ) : (
          <button title="Enable" onClick={() => onEnableDisableClick(id, ActionType.ENABLE)}>
            <BoltIcon className="text-green-400 mr-2 hover:text-gray-700 dark:hover:text-green-300 size-6" />
          </button>
        ))}
      {enableEdit && (
        <button title="Edit" onClick={() => handleEdit()}>
          <PencilIcon className="text-gray-400 mr-2 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
        </button>
      )}
      {enablePopup && onPopupClick && (
        <button onClick={() => onPopupClick(data)}>
          <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
        </button>
      )}
      {enableDelete && onDeleteClick && (
        <button title="Delete" onClick={() => onDeleteClick(id, ActionType.DELETE)}>
          <TrashBinIcon className="text-red-400 hover:text-gray-700 dark:hover:text-red-300 size-6" />
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
