import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Promo from "./components/PromoBanner.jsx"


function App() {
  return (
    <Router>
      <Navbar />
      <Slider />
      <Promo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
