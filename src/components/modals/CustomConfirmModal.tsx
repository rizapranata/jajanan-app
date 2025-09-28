"use client";
import React from "react";

import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
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
        className="max-w-[600px] p-5 lg:p-10"
        showCloseButton={false}
      >
        <h4 className="font-semibold text-gray-800 mb-7 text-title-sm dark:text-white/90">
          {title}
        </h4>
        <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
          {message}
        </p>
        <div className="flex items-center justify-end w-full gap-3 mt-8">
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
