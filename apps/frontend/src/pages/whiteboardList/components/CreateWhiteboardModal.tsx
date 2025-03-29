import { FormEvent } from "react";

interface CreateWhiteboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

export const CreateWhiteboardModal = ({
  isOpen,
  onClose,
  onSubmit,
}: CreateWhiteboardModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-[#242424] p-6 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
        <h2 className="text-xl font-bold mb-4">create a whiteboard</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            name:
            <input
              type="text"
              name="name"
              required
              className="mt-1 block w-full rounded-md border border-gray-600 bg-[#242424] px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </label>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium bg-[#242424] border border-gray-600 rounded-md hover:bg-[#2a2a2a]"
            >
              cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
            >
              create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
