"use client";
import { useEffect, useState } from "react";
import { getUsername } from "../../services/user.services"; // import fungsi getUsername
import { usePathname } from "next/navigation"; // import usePathname
import Button from "../Elements/button";

function HeadTitle({ pathname }) {
  switch (pathname) {
    case "/dashboard":
      return (
        <h1 className="text-2xl text-[#343C6A] font-semibold">Dashboard</h1>
      );
    case "/kalender":
      return (
        <h1 className="text-2xl text-[#343C6A] font-semibold">Kalender</h1>
      );
    case "/worklog":
      return (
        <h1 className="text-2xl text-[#343C6A] font-semibold">Work Log</h1>
      );
    case "/workorder":
      return (
        <h1 className="text-2xl text-[#343C6A] font-semibold">Work Order</h1>
      );
    default:
      return (
        <h1 className="text-2xl text-[#343C6A] font-semibold">
          Page ini tidak ada
        </h1>
      );
  }
}

const Navbar = () => {
  const [username, setUsername] = useState("");
  const pathname = usePathname(); // Dapatkan pathname dari usePathname

  useEffect(() => {
    const token = localStorage.getItem("token"); // ambil token dari local storage
    if (token) {
      try {
        const decodedUsername = getUsername(token); // ambil username dari token
        setUsername(decodedUsername); // simpan username ke state
      } catch (error) {
        console.error("Error getting username:", error);
      }
    }
  }, []);

  return (
    <div className="flex h-20 bg-white text-black items-center px-10 justify-between">
      <div className="text-2xl text-[#343C6A] font-semibold">
        <HeadTitle pathname={pathname} /> {/* Pass pathname to HeadTitle */}
      </div>
      <div className="flex items-center">
        <div className="px-5 font-serif">{username || "Guest"}</div>{" "}
        {/* Tampilkan username atau 'Guest' */}
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

export default Navbar;
