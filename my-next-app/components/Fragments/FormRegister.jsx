"use client";

import InputForm from "../../Input/Input";
import Button from "../Elements/button";
import { useRef, useEffect } from "react";

const FormRegister = () => {
  const fullNameRef = useRef(null);
  useEffect(() => {
    fullNameRef.current.focus();
  });
  return (
    <form action="">
      <InputForm
        label="Fullname"
        type="text"
        placeholder="insert your full name here..."
        name="fullname"
        ref={fullNameRef}
      ></InputForm>
      <InputForm
        label="Email"
        type="email"
        placeholder="example@gmail.com"
        name="email"
      ></InputForm>
      <InputForm
        label="Confirm Password"
        type="password"
        placeholder="*****"
        name="confirmPassword"
      ></InputForm>
      <InputForm
        label="Password"
        type="password"
        placeholder="*****"
        name="password"
      ></InputForm>

      <Button classname="bg-blue-600 w-full">Register</Button>
    </form>
  );
};
export default FormRegister;
