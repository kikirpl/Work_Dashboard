import { forwardRef } from "react";
import Input from "./Input";
import Label from "./Label";

const InputForm = forwardRef((props, ref) => {
  const { label, type, placeholder, name } = props;
  return (
    <div className="mb-6">
      <Label htmlfor={name}>{label}</Label>
      <input
        type={type}
        className="text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder: opacity-50"
        placeholder={placeholder}
        name={name}
        id={name}
        ref={ref}
      ></input>
    </div>
  );
});
export default InputForm;
