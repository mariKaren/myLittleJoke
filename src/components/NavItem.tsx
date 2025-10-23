import { NavLink } from "react-router";

interface NavItemProps {
    to: string;
    label: string;
    icon: React.ReactNode;
    end?: boolean;
    activeColor?: string; 
}

const baseLinkClasses = "flex flex-col items-center justify-center text-sm font-semibold transition-colors duration-600 w-20 h-12";

export const NavItem: React.FC<NavItemProps> = ({
    to,
    label,
    icon,
    end,
    activeColor = "text-purple-900",
}) => {
    return (
        <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
            `${baseLinkClasses} ${isActive ? activeColor : "text-gray-400"}`
        }
        >
            {icon}
            <span>{label}</span>
        </NavLink>
    );
};