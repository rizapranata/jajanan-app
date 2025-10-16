import { EyeCloseIcon, EyeIcon } from "@/icons";
import Input from "./InputField";
import { useState } from "react";

interface InputFieldProps {
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFieldPassword: React.FC<InputFieldProps> = ({
  type = "password",
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPassword ? "text" : type;
  return (
    <div className="lg:block">
      <div className="relative">
        <Input
          type={inputType}
          placeholder="Enter your password"
          onChange={onChange}
          value={value}
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
        >
          {showPassword ? (
            <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
          ) : (
            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
          )}
        </span>
      </div>
    </div>
  );
};

export default InputFieldPassword;
