import { FormEvent, useRef, useEffect } from "react";

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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0" onClick={onClose}></div>
      <div className="relative bg-[#242424] p-6 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
        <h2 className="text-xl font-bold mb-4">create a whiteboard</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            name:
            <input
              ref={inputRef}
              type="text"
              name="name"
              required
              className="mt-1 block w-full rounded-md border border-gray-600 bg-[#242424] px-3 py-2 shadow-sm"
            />
          </label>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose}>
              cancel
            </button>
            <button type="submit">create</button>
          </div>
        </form>
      </div>
    </div>
  );
};
