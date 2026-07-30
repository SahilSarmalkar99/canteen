import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ClipboardList,
  ShoppingCart,
  X,
} from "lucide-react";

export default function Sidebar({ closeSidebar }) {
  const menu = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Food",
      path: "/foods",
      icon: <UtensilsCrossed size={20} />,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: <ClipboardList size={20} />,
    },
    {
      name: "User Order",
      path: "/user",
      icon: <ShoppingCart size={20} />,
    },
  ];

  return (
    <div className="h-full flex flex-col bg-slate-900 text-white">

      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-slate-700">

        <h1 className="text-2xl font-bold text-blue-400">
          🍽 Food Admin
        </h1>

        {/* Mobile Close Button */}
        <button
          onClick={closeSidebar}
          className="lg:hidden"
        >
          <X size={24} />
        </button>

      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">

        {menu.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-all ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800 text-gray-300"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>

        ))}

      </nav>

      {/* Footer */}
      <div className="border-t border-slate-700 p-4 text-center text-sm text-gray-400">
        © 2026 Food Admin
      </div>

    </div>
  );
}