import Button from "@components/ui/button/Button";
import { Modal } from "@components/ui/modal";

interface IProps {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmColor: string; // 'green' | 'red' | etc.
}

const colorMap: Record<string, string> = {
  red: "bg-red-500 hover:bg-red-700",
  green: "bg-green-500 hover:bg-green-700",
  yellow: "bg-yellow-500 hover:bg-yellow-700",
  // add more as needed
};

const ConfirmationModal = (props: IProps) => {
  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={props.onCancel}
        className="max-w-[700px] m-4"
      >
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {`${props.title}`}
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              {props.description}
            </p>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={() => props.onCancel()}
            >
              Close
            </Button>
            <Button
              onClick={props.onConfirm}
              size="sm"
              className={
                colorMap[props.confirmColor] || "bg-gray-500 hover:bg-gray-700"
              }
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
