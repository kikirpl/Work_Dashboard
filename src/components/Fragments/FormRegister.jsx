import InputForm from "../Input";
import Button from "../Elements/button";

const FormRegister = () => {
  return (
    <form action="">
      <InputForm
        label="Fullname"
        type="text"
        placeholder="insert your full name here..."
        name="fullname"
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
