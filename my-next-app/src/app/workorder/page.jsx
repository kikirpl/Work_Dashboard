"use client";
import { Fragment, useEffect } from "react";
import { useRouter } from "next/navigation";
import SideMenu from "../../../components/Layouts/SideMenu";
import Navbar from "../../../components/Layouts/Navbar";
import { useLogin } from "../../../hooks/useLogin";
import TableWorkOrder from "../../../components/Fragments/TableWorkOrder";

const WorkOrderPage = () => {
  const router = useRouter();
  const { loginSuccess, loginFailed, loading } = useLogin();

  useEffect(() => {
    if (!loading) {
      // Hanya redirect ke /login jika belum login dan mencoba mengakses /worklog
      if (!loginSuccess && !localStorage.getItem("token")) {
        router.push("/login");
      } else if (loginSuccess && router.pathname !== "/worklog") {
        // Redirect ke /worklog setelah login berhasil, tapi hanya jika belum ada di halaman tersebut
        router.push("/workorder");
      }
    }
  }, [loginSuccess, loginFailed, loading, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (loginSuccess || localStorage.getItem("token")) {
    return (
      <Fragment>
        <div className="bg-neutral-100 overflow-hidden flex flex-row">
          <SideMenu />
          <div className="flex flex-col flex-1">
            <Navbar type="workorder" />
            <div className="flex flex-col flex-1 bg-[#D1DEFA] text-xl text-black">
              <TableWorkOrder />
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

export default WorkOrderPage;
