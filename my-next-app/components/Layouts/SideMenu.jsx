"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import control from "../../assets/images/control.png";
import calendersvg from "../../assets/kalender.svg";
import worklogsvg from "../../assets/worklog.svg";
import workordersvg from "../../assets/workorder.svg";
import dashboardsvg from "../../assets/dashboard.svg";
import styled from "styled-components";
import Image from "next/image";

const Icon = styled(Image)`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  transition: width 0.3s, height 0.3s;
  filter: ${({ isActive }) =>
    isActive
      ? "invert(27%) sepia(78%) saturate(6666%) hue-rotate(180deg) brightness(102%) contrast(102%)"
      : "none"};
`;

const SideMenu = () => {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const Menus = [
    { title: "Dashboard", src: dashboardsvg, path: "/dashboard" },
    { title: "Kalender", src: calendersvg, path: "/kalender" },
    { title: "Work Log", src: worklogsvg, path: "/worklog" },
    { title: "Work Order", src: workordersvg, path: "/workorder" },
  ];

  useEffect(() => {
    if (pathname === "/workorder") {
      setOpen(false);
    }
  }, [pathname]);

  const handleHomeClick = () => {
    router.push("/");
  };

  const handleMenuClick = (path) => {
    router.push(path);
  };

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-20"
        } border-r-[#D1DEFA] border-r-2 bg-white h-screen p-5 pt-8 relative duration-300`}
      >
        <Image
          src={control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          alt="control icon"
        />
        <div className="flex gap-x-4 items-center">
          <h1
            className={`text-[#343C6A] ml-8 font-semibold text-2xl duration-200 cursor-pointer ${
              !open && "scale-0"
            }`}
            onClick={handleHomeClick}
          >
            Teknomadya
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex text-semibold rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-500 text-base items-center gap-x-4
                  ${Menu.gap ? "mt-9" : "mt-2"}
                  ${
                    pathname === Menu.path
                      ? " text-blue-600 font-semibold border-l-4 border-[#2D60FF]"
                      : ""
                  } 
               `}
              onClick={() => handleMenuClick(Menu.path)}
            >
              <Icon
                src={Menu.src}
                size={open ? 24 : 35}
                isActive={pathname === Menu.path}
                alt={Menu.title}
              />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
