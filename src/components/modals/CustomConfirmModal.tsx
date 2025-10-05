"use client";
import React from "react";

import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import { AlertCircle } from "lucide-react";
interface CustomConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose: () => void;
}

export default function CustomConfirmModal({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  onClose,
}: CustomConfirmModalProps) {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={() => {}}
        className="max-w-[400px] p-5 lg:p-10"
        showCloseButton={false}
      >
        <div className="flex flex-col place-items-center">
          <AlertCircle size={50} color="orange" />
          <h6 className="font-semibold text-gray-800 my-4 text-title-sm dark:text-white/90">
            {title}
          </h6>
          <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
            {message}
          </p>
        </div>
        <div className="flex items-center justify-center w-full gap-7 mt-5">
          <Button size="sm" variant="outline" onClick={onCancel}>
            {cancelText || "Close"}
          </Button>
          <Button size="sm" onClick={onConfirm}>
            {confirmText || "Save Changes"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
