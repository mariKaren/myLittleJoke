import { Link } from "react-router-dom";


export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[var(--c-violet)] text-[var(--c-yellow)] text-center p-6 font-custom">
            <h2 className="text-7xl font-semibold mb-2">404 — Not Found!</h2>
            <p className="text-lg mb-6">
                Parece que esta broma se perdió en el escenario 🎭
            </p>
            <Link
            to="/"
            className="px-8 py-3 border-2 border-[var(--c-green)] rounded-2xl text-green-400 hover:bg-[var(--c-green)] hover:text-[var(--c-yellow)] transition-all duration-400 font-semibold"
            >
                Volver al Home
            </Link>
        
        </div>
    );
}