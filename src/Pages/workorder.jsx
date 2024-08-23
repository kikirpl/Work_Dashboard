import { Fragment } from "react";
// import CardProduct from "../components/Fragments/CardProduct";
import SideMenu from "../components/Layouts/SideMenu";
import { useLogin } from "../hooks/useLogin";
import Navbar from "../components/Layouts/Navbar";
import TableWorkOrder from "../components/Fragments/TableWorkOrder";

const WorkOrderPage = () => {
  useLogin();

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
};

export default WorkOrderPage;
