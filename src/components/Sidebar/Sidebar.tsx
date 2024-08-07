import { Link } from "react-router-dom";
import logo from "../../assets/logo/gv-logo.png";
import { ReactNode } from "react";

interface SidebarProps {
  children: ReactNode;
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({
  children,
  isOpen,
  toggleSidebar,
}: SidebarProps) {
  return (
    <aside
      className={`h-screen z-10 fixed left-0 top-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out lg:translate-x-0`}
    >
      <nav className="h-full w-[200px] flex flex-col bg-white overflow-y-auto px">
        <div className=" flex justify-between items-center">
          <img src={logo} className="" alt="Logo" />
          <button className="lg:hidden text-gray-700" onClick={toggleSidebar}>
            ✕
          </button>
        </div>
        <ul className="flex-col">{children}</ul>
      </nav>
    </aside>
  );
}

interface SidebaritemProps {
  icon: ReactNode;
  text: string;
  active: boolean;
  onClick: () => void;
  to: string;
}

export const Sidebaritem = ({
  to,
  icon,
  text,
  active,
  onClick,
}: SidebaritemProps) => (
  <li
    className={` m-1 mx-5 font-semibold text-gray-500 text-xs rounded-xl hover:bg-gray-200 ${
      active ? "bg-red-600 text-white" : ""
    }`}
    onClick={onClick}
  >
    <Link to={to} className="flex items-center py-3 px-2">
      <span className="mr-3">{icon}</span>
      {text}
    </Link>
  </li>
);
