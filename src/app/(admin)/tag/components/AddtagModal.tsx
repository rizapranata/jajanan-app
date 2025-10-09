import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { TagCreateRequest, TagResponse } from "@/types/tag";
import { useEffect, useMemo, useState } from "react";

interface AddTagProps {
  isOpen: boolean;
  isEdit: boolean;
  tag?: TagResponse; // jika ada → edit mode
  onClose: () => void;
  handleSubmit: (data: TagCreateRequest) => void;
}

export default function AddTagModal({
  isOpen,
  isEdit,
  tag,
  onClose,
  handleSubmit,
}: AddTagProps) {
  const [name, setName] = useState("");

  const resetForm = () => {
    setName("");
  };

  const isFormValid = useMemo(() => {
    return name.trim() !== "";
  }, [name]);

  if (!isOpen) return null;

  const onSubmit = () => {
    handleSubmit({
      name,
    });
    resetForm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      className="max-w-1/3 p-5 lg:p-10"
      showCloseButton={false}
    >
      <form className="">
        <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
          {isEdit ? "Edit Tag" : "Add Tag"}
        </h4>

        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="col-span-1 sm:col-span-2">
            <Label>Tag Name</Label>
            <Input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
              placeholder="Cookies"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-end w-full gap-3 mt-6">
          <Button size="sm" variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button size="sm" disabled={!isFormValid} onClick={onSubmit}>
            {isEdit ? "Update Tag" : "Save Tag"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
