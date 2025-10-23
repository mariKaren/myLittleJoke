
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Home } from "./pages/Home";
import { Favorites } from "./pages/Favorites";
import { BottomNav } from "./components/BottomNav";

export default function App(){
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Contenido principal */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>

        {/* Footer con navegación fija */}
        <footer>
          <BottomNav />
        </footer>
        
      </div>
    </Router>
    //agregar 404
  );
};