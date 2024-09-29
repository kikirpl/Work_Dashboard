import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  const { type, placeholder, name, ...rest } = props; // Destructure other props

  return (
    <input
      type={type}
      className="text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder:opacity-50"
      placeholder={placeholder}
      name={name}
      id={name}
      ref={ref}
      {...rest} // Pass the remaining props like value and onChange
    />
  );
});

export default Input;
