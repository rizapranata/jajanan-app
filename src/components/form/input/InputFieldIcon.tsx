interface InputFieldIconProps {
  type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
  value?: "text" | "number" | "email" | "password" | "date" | "time" | string;
  placeholder: string;
  className?: string;
  icon: React.ReactNode;
  start: boolean;
  error?: boolean;
  hint?: string; // Optional hint text
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFieldIcon: React.FC<InputFieldIconProps> = ({
  type = "text",
  value,
  placeholder,
  className = "",
  icon,
  hint,
  start = true,
  error = false,
  onChange,
}) => {
  let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${className}`;

  if (error) {
    inputClasses += ` text-error-800 border-error-500 focus:ring-3 focus:ring-error-500/10  dark:text-error-400 dark:border-error-500`;
  }
  return (
    <div className="hidden md:flex lg:block">
      <form>
        <div className="relative">
          {start && (
            <span className="absolute -translate-y-1/2 left-4 top-1/2 pointer-events-none">
              {icon}
            </span>
          )}

          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
          />

          {!start && (
            <span className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
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

          {/* <button className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
            <span> ⌘ </span>
            <span> K </span>
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default InputFieldIcon;
