import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import { useState } from "react";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (data: {
    full_name: string;
    email: string;
    password: string;
    role: string;
  }) => void;
}

const options = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
];

export default function AddUserModal({
  isOpen,
  onClose,
  handleSubmit,
}: AddUserModalProps) {
  const { openModal, closeModal } = useModal();
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const onSubmit = () => {
    const full_name = `${firstName} ${lastName}`;
    handleSubmit({ full_name, email, password, role });
    closeModal();
  };

  const handleSelectChange = (value: string) => {
    setRole(value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[584px] p-5 lg:p-10"
    >
      <form className="">
        <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
          Personal Information
        </h4>

        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="col-span-1">
            <Label>First Name</Label>
            <Input
              type="text"
              placeholder="Emirhan"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="col-span-1">
            <Label>Last Name</Label>
            <Input
              type="text"
              placeholder="Boruch"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="col-span-1">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="emirhanboruch55@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="col-span-1">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="col-span-1 sm:col-span-2">
            <Label>
              Role<span className="text-error-500">*</span>
            </Label>
            <Select
              className="mt-1 block w-full rounded-md border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
              options={options}
              onChange={handleSelectChange}
            />
          </div>
        </div>

        <div className="flex items-center justify-end w-full gap-3 mt-6">
          <Button size="sm" variant="outline" onClick={onClose || closeModal}>
            Close
          </Button>
          <Button size="sm" onClick={onSubmit}>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}
