import { ActionType } from "@types";
import {
  PencilIcon,
  BanIcon,
  BoltIcon,
  TrashBinIcon,
  Refresh,
  EyeIcon,
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
}: Props) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    if (!editUrl) return;
    navigate(editUrl);
  };

  return (
    <div>
      {enablePasswordReset && onPasswordResetClick && (
        <button
          onClick={() => onPasswordResetClick(id, ActionType.RESET_PASSWORD)}
        >
          <Refresh className="text-blue-400 mr-2 hover:text-gray-700 dark:blue:text-red-300 size-5" />
        </button>
      )}
      {enableDisableButton &&
        (isActive ? (
          <button onClick={() => onEnableDisableClick(id, ActionType.DISABLE)}>
            <BanIcon className="text-red-400 mr-2 hover:text-gray-700 dark:hover:text-red-300 size-6" />
          </button>
        ) : (
          <button onClick={() => onEnableDisableClick(id, ActionType.ENABLE)}>
            <BoltIcon className="text-green-400 mr-2 hover:text-gray-700 dark:hover:text-green-300 size-6" />
          </button>
        ))}
      {enableEdit && (
        <button onClick={() => handleEdit()}>
          <PencilIcon className="text-gray-400 mr-2 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
        </button>
      )}
      {enablePopup && onPopupClick && (
        <button onClick={() => onPopupClick(data)}>
          <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
        </button>
      )}
      {enableDelete && onDeleteClick && (
        <button onClick={() => onDeleteClick(id, ActionType.DELETE)}>
          <TrashBinIcon className="text-red-400 hover:text-gray-700 dark:hover:text-red-300 size-6" />
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
