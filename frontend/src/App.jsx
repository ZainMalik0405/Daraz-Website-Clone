import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import LoginModal from "./pages/Auth/LoginModal.jsx";
import SignupModal from "./pages/Auth/SignupModal.jsx";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("darazUser");
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  const logoutUser = () => {
    localStorage.removeItem("darazUser");
    setCurrentUser(null);
    alert("You've been logged out successfully.");
  };

  return (
    <Router>
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          setCurrentUser={setCurrentUser}
        />
      )}

      {showSignupModal && (
        <SignupModal
          onClose={() => setShowSignupModal(false)}
          setCurrentUser={setCurrentUser}
        />
      )}

      <Navbar
        onLoginClick={() => setShowLoginModal(true)}
        onSignupClick={() => setShowSignupModal(true)}
        currentUser={currentUser}
        onLogout={logoutUser}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
