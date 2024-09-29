"use client";

import { Fragment, useEffect } from "react";
import { useRouter } from "next/navigation";
import SideMenu from "../../../components/Layouts/SideMenu";
import Navbar from "../../../components/Layouts/Navbar";
import TableWorkLog from "../../../components/Fragments/TableWorkLog";
import { useLogin } from "../../../hooks/useLogin";

const WorkLogPage = () => {
  const router = useRouter();
  const { loginSuccess, loginFailed, loading } = useLogin();

  useEffect(() => {
    if (!loading) {
      // Hanya redirect ke /login jika belum login dan mencoba mengakses /worklog
      if (!loginSuccess && !localStorage.getItem("token")) {
        router.push("/login");
      } else if (loginSuccess && router.pathname !== "/worklog") {
        // Redirect ke /worklog setelah login berhasil, tapi hanya jika belum ada di halaman tersebut
        router.push("/worklog");
      }
    }
  }, [loginSuccess, loginFailed, loading, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Tampilkan halaman hanya jika loginSuccess atau token ada
  if (loginSuccess || localStorage.getItem("token")) {
    return (
      <Fragment>
        <div className="bg-neutral-100 overflow-hidden flex flex-row">
          <SideMenu />
          <div className="flex flex-col flex-1">
            <Navbar type="worklog" />
            <div className="flex flex-1 bg-[#D1DEFA] text-xl text-black">
              <TableWorkLog />
            </div>
          </div>
        </div>
      </Fragment>
    );
  } else {
    // Jika tidak login, jangan tampilkan apa pun (atau tampilkan pesan error jika perlu)
    return null;
  }
};

export default WorkLogPage;
