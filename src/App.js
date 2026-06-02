import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";

import PartnersPage from "./pages/partners/PartnersPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AboutPresident from "./pages/AboutPresident";
import Logomuz from "./pages/Logomuz";
import PartnerDetailsPage from "./pages/partners/PartnerDetailsPage";
import FormPage from "./pages/FormPage";
import TestPage from "./test/TestPage";

export default function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/baskan-hakkinda" element={<AboutPresident />} />
        <Route path="/baskan" element={<AboutPresident />} />

        <Route path="/esit-isyerleri" element={<PartnersPage />} />
        <Route path="/isyerleri" element={<PartnersPage />} />

        <Route path="/detay/:id" element={<PartnerDetailsPage />} />


        <Route path="/hakkimizda" element={<About />} />
        <Route path="/basvuru-sartlari" element={<About />} />
        <Route path="/esit-isyeri-nedir" element={<About />} />

        <Route path="/iletisim" element={<Contact />} />
        <Route path="/logomuz" element={<Logomuz />} />
        <Route path="/form" element={<FormPage />} />

        <Route path="/test" component={TestPage} />


      </Routes>
    </Router>
  );
}
