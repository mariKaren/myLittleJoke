
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router";
import  Home  from "./pages/Home";
import Favorites from "./pages/Favorites";
import Layout from './components/Layout';
import NotFound from './pages/NotFound';

export default function App(){
  return (
    <Router>
        <Routes>
          {/* Rutas que usan el Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Route>

          {/* Ruta que no usa Layout */}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  );
};