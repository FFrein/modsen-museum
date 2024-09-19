import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Home/index";
import Art from "./pages/Art";
import Favourites from "./pages/Favorites/index";
import Header from "./components/Header/index";
import Footer from "./components/Footer/index";

const AppRoutes: React.FC = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/art" element={<Art />} />
      <Route path="/fav" element={<Favourites />} />
    </Routes>
    <Footer />
  </Router>
);

export default AppRoutes;
