import { Fragment } from "react";
// import CardProduct from "../components/Fragments/CardProduct";
import SideMenu from "../../../components/Layouts/SideMenu";
// import { useLogin } from "../hooks/useLogin";
import Navbar from "../../../components/Layouts/Navbar";
import Kalender from "../../../components/Fragments/kalender";
// import "../../app/";

const KalenderPage = () => {
  // useLogin();

  return (
    <Fragment>
      <div className=" overflow-hidden flex flex-row">
        <SideMenu />
        <div className="flex flex-col flex-1">
          <Navbar type="kalender" />
          <div className="flex flex-col flex-1 bg-[#D1DEFA] text-xl text-black">
            <h1 className="text-2xl text-[#303030] font-bold mx-6 my-6">
              Kalender aktivitas & pekerjaan
            </h1>
            <Kalender />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default KalenderPage;
