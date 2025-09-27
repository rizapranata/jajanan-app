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
  useGetUsersQuery,
  useUpdateStatusUserMutation,
} from "@/store/user/userApi";
import { EditIcon, TrashIcon, PlusIcon } from "lucide-react";
import AddUserModal from "./AddUserModal";
import { useState } from "react";
import { useRegisterMutation } from "@/store/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/auth/authSlice";
import CustomModalAlert from "@/components/modals/CustomModalAlert";
import { useRouter } from "next/navigation";

interface UserAddType {
  full_name: string;
  email: string;
  password: string;
  role: string;
}

export default function UserTable() {
  const { data: users, isLoading, error } = useGetUsersQuery();
  const [updateStatusUser] = useUpdateStatusUserMutation();
  const [openModal, setOpenModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [register] = useRegisterMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleToggleChange = (userId: string) => {
    const user = users?.data.find((u) => u._id === userId);
    if (!user) return;

    updateStatusUser({
      id: userId,
      is_active: user.is_active ? 0 : 1,
    });
  };

  const handleDelete = (userId: string) => {
    console.log("Delete user ID:", userId);
  };

  const handleAddUser = async (data: UserAddType) => {
    try {
      const { full_name, email, password, role } = data;
      const res = await register({ full_name, email, password, role }).unwrap();
      dispatch(setCredentials({ user: res.data, token: "" }));
      setMessage(res?.message);
      console.log("Adding user:", { full_name, email, password, role });
      setOpenModal(false);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const onClose = () => {
    router.push("/");
    setMessage("");
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
                        onClick={() => handleDelete(user._id)}
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
          title="Sign Up Successful"
          description="Your account has been created successfully!"
          onClose={() => setIsSuccess(false)}
        />
        <CustomModalAlert
          type="warning"
          isOpen={!!error}
          title="Oops..!"
          description={message || "An error occurred during sign up."}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
