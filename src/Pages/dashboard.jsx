import { Fragment } from "react";
// import CardProduct from "../components/Fragments/CardProduct";
import SideMenu from "../components/Layouts/SideMenu";
import { useLogin } from "../hooks/useLogin";
import Navbar from "../components/Layouts/Navbar";
import CardList from "../components/Fragments/CardDashboard";

const ProductsPage = () => {
  useLogin();

  return (
    <Fragment>
      <div className="bg-neutral-100 overflow-hidden flex flex-row">
        <SideMenu />
        <div className="flex flex-col flex-1 bg-[#D1DEFA] text-xl text-black">
          <Navbar />
          <div className="flex justify-center py-10 px-11 flex-wrap">
            <CardList />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductsPage;
