"use client";

import { Tone } from "@lib/Tone";
import { useState } from "react";

export const Dialog = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = async () => {
    setIsOpen(false);
    await Tone.start();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black z-40"></div>
      <dialog
        className="fixed inset-0 z-50 flex items-center justify-center"
        open
      >
        <div className="relative z-50 p-4">
          <form method="dialog">
            <button onClick={handleClose}>start</button>
          </form>
        </div>
      </dialog>
    </>
  );
};
