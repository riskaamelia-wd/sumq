"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, ReactNode } from "react";

export default function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, []);

  const closeModal = () => {
    dialogRef.current?.close();
    router.back();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      closeModal();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onClose={closeModal}
      className="backdrop:bg-black/70 bg-transparent p-0 rounded-lg shadow-2xl max-w-6xl w-full"
    >
      <div className="bg-white p-8 rounded-lg relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition text-gray-700 font-bold text-xl"
        >
          ×
        </button>
        {children}
      </div>
    </dialog>
  );
}
