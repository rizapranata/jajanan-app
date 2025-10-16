"use client";

interface InputFieldIconProps {
  type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
  value?: "text" | "number" | "email" | "password" | "date" | "time" | string;
  id?: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  min?: string;
  max?: string;
  step?: number;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  hint?: string; // Optional hint text
  icon: React.ReactNode;
  start: boolean;
}

const InputFieldIcon: React.FC<InputFieldIconProps> = ({
  type = "text",
  value,
  id,
  name,
  placeholder,
  defaultValue,
  className = "",
  min,
  max,
  step,
  disabled = false,
  success = false,
  hint,
  start = true,
  error = false,
  icon,
  onChange,
}) => {
  const isIconStart = start ? "pl-12" : "";
  let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${className}`;

  // Add styles for the different states
  inputClasses += isIconStart;
  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
  } else if (error) {
    inputClasses += ` text-error-800 border-error-500 focus:ring-3 focus:ring-error-500/10  dark:text-error-400 dark:border-error-500`;
  } else if (success) {
    inputClasses += ` text-success-500 border-success-400 focus:ring-success-500/10 focus:border-success-300  dark:text-success-400 dark:border-success-500`;
  } else {
    inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
  }

  return (
    <div className="lg:block">
      <div className="relative">
        {start && (
          <span className="absolute left-1 top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
            {icon}
          </span>
        )}

        <input
          type={type}
          value={value}
          onChange={onChange}
          id={id}
          name={name}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          className={inputClasses}
        />

        {!start && (
          <span className="absolute right-1 top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
            {icon}
          </span>
        )}

        {/* Optional Hint Text */}
        {hint && (
          <p
            className={`mt-1.5 text-xs ${
              error ? "text-error-500" : "text-gray-500"
            }`}
          >
            {hint}
          </p>
        )}
      </div>
    </div>
  );
};

export default InputFieldIcon;
