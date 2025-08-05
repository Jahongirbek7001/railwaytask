import React from "react";

const AddGU45Modal = ({ isOpen, onClose, children }: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="m-auto fixed inset-0 z-50 flex items-center justify-center bg-white/20 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-lg"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default AddGU45Modal;
