"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "../../../hooks/useLogin";
import SideMenu from "../../../components/Layouts/SideMenu";
import Navbar from "../../../components/Layouts/Navbar";
import CardList from "./CardDashboard";

const DashboardPage = () => {
  const router = useRouter();
  const { loginSuccess, loginFailed, loading } = useLogin();

  useEffect(() => {
    if (!loading) {
      if (!loginSuccess && loginFailed) {
        router.push("/login");
      }
    }
  }, [loginSuccess, loginFailed, loading, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!loginSuccess && loginFailed) {
    return null; // Tidak merender apa pun jika autentikasi gagal
  }

  return (
    <div className="bg-neutral-100 overflow-hidden flex flex-row">
      <SideMenu />
      <div className="flex flex-col flex-1 bg-[#D1DEFA] text-xl text-black">
        <Navbar type="/dashboard" />
        <div className="flex justify-center py-10 px-11 flex-wrap">
          <CardList />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
