import { Outlet } from "react-router-dom";
import { FaTheaterMasks } from "react-icons/fa";
import BottomNav from "./BottomNav";


const Layout= () => {
    return (
        <div className="min-h-screen flex flex-col bg-c-yellow font-custom">
            
        {/* Header */}
            <header className="flex justify-center sm:justify-start items-center gap-2 px-10 py-4 max-w-7xl mx-auto w-full">
                <FaTheaterMasks size={24} color="#2cb383" />
                <h1 className="fc-green-logo italic font-custom-tittle">
                MyLittleJoke
                </h1>
            </header>

        {/* Contenido principal */}
            <main className="flex-1 px-4">
                <Outlet />
            </main>

        {/* Footer */}
            <footer>
                <BottomNav />
            </footer>
        </div>
    );
};

export default Layout;