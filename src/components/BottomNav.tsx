import { Laugh, Star } from "lucide-react";
import { NavItem } from "./NavItem";

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full h-20 bg-white/80 backdrop-blur-sm shadow-inner border-t border-gray-200">
      <div className="flex justify-center items-center h-full gap-16">
        <NavItem to="/" end label="Bromas" icon={<Laugh size={24} />} />
        <NavItem to="/favorites" label="Favoritos" icon={<Star size={24} />} />
      </div>
    </nav>
  );
};

export default BottomNav;