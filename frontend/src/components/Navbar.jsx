import { Link } from "react-router-dom";

const Navbar = ({ onLoginClick, onSignupClick, currentUser, onLogout }) => (
  <div>
    {/* Top Utility Bar */}
    <div className="bg-orange text-white py-1 px-3 small d-flex justify-content-end align-items-center flex-wrap">
      <div className="d-flex gap-5">
        <a href="#" className="text-white text-decoration-none">SAVE MORE ON APP</a>
        <a href="#" className="text-white text-decoration-none">SELL ON DARAZ</a>
        <a href="#" className="text-white text-decoration-none">HELP & SUPPORT</a>
        {!currentUser ? (
          <>
            <button onClick={onLoginClick} className="text-white bg-transparent border-0">LOGIN</button>
            <button onClick={onSignupClick} className="text-white bg-transparent border-0">SIGN UP</button>
          </>
        ) : (
          <button onClick={onLogout} className="text-white bg-transparent border-0">LOGOUT</button>
        )}
        <a href="#" className="text-white text-decoration-none">زبان تبدیل کریں</a>
      </div>
    </div>

    {/* Main Navigation */}
    <nav className="navbar navbar-expand-lg navbar-dark bg-orange px-3 py-3 shadow">
      <Link className="navbar-brand fw-bold fs-3 d-flex align-items-center gap-2" to="/">
        <img
          src="https://lzd-img-global.slatic.net/us/domino/3b870cb043c7f8a9741cbf66329e294e.png"
          alt="Daraz Logo"
          style={{ height: "36px", marginLeft: "100px" }}
        />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMain"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navMain">
        <form
          className="d-flex align-items-center"
          style={{
            marginLeft: "auto",
            marginRight: "170px",
            width: "800px",
          }}
        >
          <input
            className="form-control"
            type="search"
            placeholder="Search in Daraz"
            aria-label="Search"
            style={{
              height: "50px",
              borderRadius: "0",
              flexGrow: 1,
            }}
          />
          <button
            type="submit"
            className="search-button"
            style={{
              backgroundColor: "#FBBBA8",
              border: "none",
              borderRadius: "0",
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
            }}
          >
            <i
              className="bi bi-search"
              style={{
                color: "#F55524",
                fontSize: "20px",
              }}
            ></i>
          </button>
        </form>

        <ul className="navbar-nav ms-auto">
          <li className="nav-item" style={{ marginRight: "20px" }}>
            <a href="#" className="nav-link">
              <i className="bi bi-cart-fill fs-2 p-2"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

export default Navbar;
