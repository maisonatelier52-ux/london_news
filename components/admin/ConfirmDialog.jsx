// components/admin/ConfirmDialog.jsx
"use client";

export default function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, confirmText = "Delete", danger = true }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-red-500/30 rounded-2xl max-w-sm w-full p-6">
        <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
              danger
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-[#F5C645] text-black hover:bg-[#F5C645]/90"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}