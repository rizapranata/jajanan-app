"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Alert from "../ui/alert/Alert";
import CustomModalAlert from "../modals/CustomModalAlert";
import {
  useChangePasswordMutation,
  useLogoutMutation,
} from "@/store/auth/authApi";
import { ChangePasswordRequest } from "@/types/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setCredentials } from "@/store/auth/authSlice";
import { useRouter } from "next/navigation";
import InputFieldPassword from "../form/input/InputFieldPassword";

export default function UserChangePasswordCard() {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const { isOpen, openModal, closeModal } = useModal();
  const [newPass, setNewPass] = useState<string>("");
  const [currentPass, setCurrentPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const [changePassword] = useChangePasswordMutation();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isOpenAlert) {
      const timer = setTimeout(() => setIsOpenAlert(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpenAlert]);

  const isFormValid = useMemo(() => {
    return newPass !== "" && currentPass !== "" && confirmPass !== "";
  }, [newPass, currentPass, confirmPass]);

  const handleSave = async () => {
    try {
      if (newPass !== confirmPass) {
        console.log("new pass and confirm pass not match!");
        setIsOpenAlert(true);
        setErrorMessage("New password and confirm password not match!");
        return;
      }

      const payload: ChangePasswordRequest = {
        currentPassword: currentPass,
        newPassword: newPass,
      };

      const { message } = await changePassword(payload).unwrap();
      setMessage(message);
      setIsSuccess(true);
    } catch (error: any) {
      const { data } = error;
      setIsOpenAlert(true);
      setErrorMessage(data.message);
      console.log("Error message:", data.message);
    }
  };

  async function handleLogout() {
    try {
      await logout().unwrap();
      dispatch(setCredentials({ token: token, user: null }));
      router.push("/signin");
    } catch (err: any) {
      console.error("Logout failed:", err.message);
    }
  }

  const handleConfirmSuccess = () => {
    setIsSuccess(false);
    handleLogout();
    closeModal();
    resetForm();
  };

  function resetForm() {
    setNewPass("");
    setCurrentPass("");
    setConfirmPass("");
    setMessage("");
  }

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Change Password
            </h4>
          </div>

          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                fill=""
              />
            </svg>
            Edit
          </button>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => {}}
        showCloseButton={false}
        className="max-w-[700px] m-4"
      >
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="pb-3">
            {isOpenAlert && (
              <Alert
                variant={"warning"}
                title={"Oops.."}
                message={errorMessage}
              />
            )}
          </div>
          <div className="px-2 pb-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Change Password
            </h4>
          </div>
          <form className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2 lg:grid-cols-2">
                <div className="md:col-span-2">
                  <Label>Current Password</Label>
                  <InputFieldPassword
                    onChange={(e) => setCurrentPass(e.target.value)}
                  />
                </div>

                <div>
                  <Label>New Password</Label>
                  <InputFieldPassword
                    onChange={(e) => setNewPass(e.target.value)}
                  />
                </div>

                <div>
                  <Label>Confirm Password</Label>
                  <InputFieldPassword
                    onChange={(e) => setConfirmPass(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  closeModal();
                  resetForm();
                }}
              >
                Close
              </Button>
              <Button disabled={!isFormValid} size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
      <CustomModalAlert
        type="success"
        isOpen={isSuccess}
        title="Successful"
        description={message || "User added successfully."}
        onClose={handleConfirmSuccess}
      />
    </>
  );
}
