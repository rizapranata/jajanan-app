import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { CreateUserRequest, DetailUserResponse } from "@/types/auth";
import { useEffect, useMemo, useState } from "react";

interface AddUserModalProps {
  isOpen: boolean;
  isEdit: boolean;
  user?: DetailUserResponse; // jika ada → edit mode
  onClose: () => void;
  handleSubmit: (data: CreateUserRequest) => void;
}

const options = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
];

export default function AddUserModal({
  isOpen,
  isEdit,
  user,
  onClose,
  handleSubmit,
}: AddUserModalProps) {
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setRole("");
  };

  useEffect(() => {
    if (user && isEdit) {
      const [first, ...lastParts] = user.data.full_name?.split(" ") ?? ["", ""];
      setFirstName(first);
      setLastName(lastParts.join(" "));
      setEmail(user.data.email);
      setRole(user.data.role);
      setPassword(""); // kosongkan password saat edit
    } else {
      resetForm();
    }
  }, [user, isEdit, isOpen]);

  const isFormValid = useMemo(() => {
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      email.trim() !== "" &&
      role.trim() !== "" &&
      (isEdit ? true : password.trim() !== "")
    );
  }, [firstName, lastName, email, role, password, isEdit]);

  if (!isOpen) return null;

  const onSubmit = () => {
    const full_name = `${firstName} ${lastName}`;
    handleSubmit({
      full_name,
      email,
      role,
      password: password ?? "", // selalu kirim password, kosong jika tidak diisi
    });
    resetForm();
    onClose();
  };

  const handleSelectChange = (value: string) => {
    setRole(value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      className="max-w-1/2 p-5 lg:p-10"
      showCloseButton={false}
    >
      <form className="">
        <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
          {isEdit ? "Edit User" : "Add User"}
        </h4>

        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="col-span-1">
            <Label>First Name</Label>
            <Input
              type="text"
              placeholder="Emirhan"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="col-span-1">
            <Label>Last Name</Label>
            <Input
              type="text"
              placeholder="Boruch"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="col-span-1">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="emirhanboruch55@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isEdit} // biasanya email tidak boleh diubah
            />
          </div>

          <div className="col-span-1">
            <Label>Password {isEdit && "(optional)"}</Label>
            <Input
              type="password"
              placeholder="password"
              value={password}
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
              initValue={role}
              onChange={handleSelectChange}
            />
          </div>
        </div>

        <div className="flex items-center justify-end w-full gap-3 mt-6">
          <Button size="sm" variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button size="sm" disabled={!isFormValid} onClick={onSubmit}>
            {isEdit ? "Update User" : "Save User"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
