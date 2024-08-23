import { Fragment } from "react";
// import CardProduct from "../components/Fragments/CardProduct";
import SideMenu from "../components/Layouts/SideMenu";
import { useLogin } from "../hooks/useLogin";
import Navbar from "../components/Layouts/Navbar";
import TableWorkLog from "../components/Fragments/TableWorkLog";

const WorkLogPage = () => {
  useLogin();

  return (
    <Fragment>
      <div className="bg-neutral-100 overflow-hidden flex flex-row">
        <SideMenu />
        <div className="flex flex-col  flex-1">
          <Navbar type="worklog" />
          <div className="flex flex-1 bg-[#D1DEFA] text-xl text-black">
            <TableWorkLog />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default WorkLogPage;
