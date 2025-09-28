"use client";

import Switch from "@/components/form/switch/Switch";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateStatusUserMutation,
} from "@/store/user/userApi";
import CustomModalAlert from "@/components/modals/CustomModalAlert";
import CustomConfirmModal from "@/components/modals/CustomConfirmModal";
import AddUserModal from "./AddUserModal";
import { EditIcon, TrashIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { CreateUserRequest } from "@/types/auth";

export default function UserTable() {
  const { data: users, isLoading, error } = useGetUsersQuery();
  const [updateStatusUser] = useUpdateStatusUserMutation();
  const [createUser] = useCreateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleToggleChange = (userId: string) => {
    const user = users?.data.find((u) => u._id === userId);
    if (!user) return;

    updateStatusUser({
      id: userId,
      is_active: user.is_active ? 0 : 1,
    });
  };

  const openDeleteModal = (userId: string) => {
    setUserId(userId);
    setOpenConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    const res = await deleteUser(userId).unwrap();
    setMessage(res.message || "User deleted successfully");
    setIsSuccess(true);
    setOpenConfirmModal(false);
  };

  const handleAddUser = async (data: CreateUserRequest) => {
    try {
      const { full_name, email, password, role } = data;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrorMessage("Invalid format email!")
        return;
      }
      const res = await createUser({
        full_name,
        email,
        password,
        role,
      }).unwrap();

      setMessage(res.message || "User added successfully");
      setOpenModal(false);
      setIsSuccess(true);
    } catch (error) {
      const { data } = error as any;
      setErrorMessage(data?.message || "Failed to add user");
      setOpenModal(false);
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Manage Users
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            type="button"
            variant="outline"
            startIcon={<PlusIcon className="h-4 w-4" />}
            onClick={() => setOpenModal(true)}
          >
            Add User
          </Button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Name
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Email
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Role
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {users?.data?.map((user) => (
              <TableRow key={user._id} className="">
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {user.full_name}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {user.email}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={user.role === "admin" ? "primary" : "info"}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="flex items-center gap-2 mb-1">
                    <Switch
                      defaultChecked={user.is_active === 1}
                      onChange={() => handleToggleChange(user._id)}
                      label={""}
                    />
                    <Badge
                      size="sm"
                      color={user.is_active === 1 ? "success" : "warning"}
                    >
                      {user.is_active === 1 ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {user.role !== "admin" && (
                    <div className="flex items-center gap-3">
                      <button className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
                        <EditIcon className="inline h-4 w-4 stroke-[2.5]" />
                      </button>
                      <button
                        className="text-error-500 hover:text-error-600 dark:text-error-400"
                        onClick={() => openDeleteModal(user._id)}
                      >
                        <TrashIcon className="inline h-4 w-4 stroke-[2.5]" />
                      </button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <AddUserModal
          isOpen={openModal}
          onClose={handleCancel}
          handleSubmit={(data) => handleAddUser(data)}
        />
        <CustomModalAlert
          type="success"
          isOpen={isSuccess}
          title="Successful"
          description={message || "User added successfully."}
          onClose={() => setIsSuccess(false)}
        />
        <CustomModalAlert
          type="warning"
          isOpen={!!errorMessage}
          title="Oops..!"
          description={errorMessage || "An error occurred during sign up."}
          onClose={() => setErrorMessage(null)}
        />
        <CustomConfirmModal
          isOpen={openConfirmModal}
          onClose={() => setOpenConfirmModal(false)}
          confirmText="Delete"
          cancelText="Cancel"
          title="Are you sure?"
          message="Do you really want to delete this user?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setOpenConfirmModal(false)}
        />
      </div>
    </div>
  );
}
