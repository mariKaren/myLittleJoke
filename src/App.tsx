
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router";
import  Home  from "./pages/Home";
import Favorites from "./pages/Favorites";
import Layout from './components/Layout';

export default function App(){
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          {/* <Route path="*" element={<NotFound />} />  */}{/* 404 */}
        </Routes>
      </Layout>
    </Router>
    //agregar 404
  );
};