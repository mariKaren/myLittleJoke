import { NavLink } from "react-router";
import { Laugh, Star } from "lucide-react";

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full h-18 bg-white shadow-inner py-3">
      <div className="flex justify-center items-center h-full gap-16">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex flex-col items-center text-sm font-semibold transition-colors ${
              isActive ? "text-gray-900" : "text-gray-400"
            }`
          }
        >
          <Laugh size={24} />
          <span>Bromas</span>
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm font-semibold transition-colors ${
              isActive ? "text-gray-900" : "text-gray-400"
            }`
          }
        >
          <Star size={24} />
          <span>Favoritos</span>
        </NavLink>
      </div>
    </nav>
  );
};