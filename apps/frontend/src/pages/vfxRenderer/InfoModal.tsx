import { useState, useEffect } from "react";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal = ({ isOpen, onClose }: InfoModalProps) => {
  if (!isOpen) return null;

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-20"
      onClick={handleOutsideClick}
    >
      <div className="bg-[#111] rounded-lg p-5 max-w-md w-full shadow-xl">
        <div className="space-y-3 text-sm">
          <p>
            this rendering engine is built with rust and uses glsl shaders
            compiled to wasm that run directly in your browser
          </p>

          <p>
            all visual effects are processed in real-time through a custom
            pipeline that mimics analog video artifacts and distortions
          </p>

          <p>this application is optimized for chrome browsers</p>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="bg-purple-600/80 text-white border-none rounded px-3 py-2 text-xs"
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
};
