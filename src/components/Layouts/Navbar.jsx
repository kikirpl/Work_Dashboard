import { useLogin } from "../../hooks/useLogin";
import Button from "../Elements/button";
import AuthLayout from "./AuthLayouts";

const Navbar = () => {
  const username = useLogin();

  return (
    <div className="flex h-20 bg-white text-black items-center px-10 justify-between">
      <div className="text-2xl text-[#343C6A] font-semibold">
        <HeadTitle />
      </div>
      <div className="flex items-center">
        <div className="px-5 font-serif">{username}</div>
        <Button className="bg-[#72c1c5]" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
};
const HeadTitle = (type) => {
  switch (type) {
    case "dashboard":
      return (
        <h1 className="text-2xl text-[#343C6A] font-semibold">Dashboard</h1>
      );
    case "kalender":
      return (
        <h1 className="text-2xl text-[#343C6A] font-semibold">Kalender</h1>
      );
    case "worklog":
      return (
        <h1 className="text-2xl text-[#343C6A] font-semibold">Work Log</h1>
      );
    case "workorder":
      return (
        <h1 className="text-2xl text-[#343C6A] font-semibold">Work Order</h1>
      );
    default:
      <h1 className="text-2xl text-[#343C6A] font-semibold">
        Page ini tidak ada
      </h1>;
      return null;
  }
};

export default Navbar;
