import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { About } from "./components/About";
import { Cta } from "./components/Cta";
// import { FAQ } from "./components/FAQ";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Navbar } from "./components/Navbar";
import { Newsletter } from "./components/Newsletter";
import { Pricing } from "./components/Pricing";
import { ScrollToTop } from "./components/ScrollToTop";
// import { Services } from "./components/Services";
// import { Sponsors } from "./components/Sponsors";
// import { Team } from "./components/Team";
import { Testimonials } from "./components/Testimonials";
import "./App.css";
import  GrowAPlant  from "./components/GrowAPlant";
import { MetadataProvider } from './contexts/MetadataContext';
import { FileCidProvider } from "./contexts/FileCidContext";


function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
        <FileCidProvider>
         <MetadataProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/grow-a-plant" element={<GrowAPlant />} />
      </Routes>
        </MetadataProvider>
       </FileCidProvider>
      <Footer />
    </Router>
  );
}

const Home = () => (
  <>
    <Hero />
    <About />
    <HowItWorks />
    <Features />
    <Cta />
    <Testimonials />
    <Pricing />
    <Newsletter />
  </>
);

export default App;
