"use client";

import Form from "@/components/form/Form";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";

import { FormEvent, useState } from "react";

export default function AddUser() {
  const [role, setRole] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("username"));
    console.log(data.get("email"));
    console.log(data.get("password"));
    console.log(role);
  };

  const handleSelectChange = (value: string) => {
    setRole(value);
  };

  const options = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ];

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 space-y-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Add User
        </h2>
        <Form className="space-y-4" onSubmit={handleSubmit}>
          <Label>
            Full Name<span className="text-error-500">*</span>
          </Label>
          <Input name="username" type="text" />
          <Label>
            Email<span className="text-error-500">*</span>
          </Label>
          <Input name="email" type="email" />
          <Label>
            Password<span className="text-error-500">*</span>
          </Label>
          <Input name="password" type="password" />

          <div>
            <Label>
              Role<span className="text-error-500">*</span>
            </Label>
            <Select
              className="mt-1 block w-full rounded-md border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
              options={options}
              onChange={handleSelectChange}
            />
          </div>
          <div className="flex justify-end pt-5">
            <Button className="justify-end" size="sm" type="submit">
              Add User
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
