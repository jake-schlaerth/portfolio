interface DeleteWhiteboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export const DeleteWhiteboardModal = ({
  isOpen,
  onClose,
  onConfirm,
}: DeleteWhiteboardModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-[#242424] p-6 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
        <h2 className="text-xl font-bold mb-4">delete whiteboard</h2>
        <div className="space-y-4">
          <p className="text-gray-300">
            are you sure you want to delete this whiteboard? this action cannot
            be undone.
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium bg-[#242424] border border-gray-600 rounded-md hover:bg-[#2a2a2a]"
            >
              cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
            >
              delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
