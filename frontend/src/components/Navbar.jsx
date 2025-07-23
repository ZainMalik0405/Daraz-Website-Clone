import { Link } from "react-router-dom";

const Navbar = () => (
  <div>
    {/* Top Utility Bar */}
    <div className="bg-orange text-white py-1 px-3 small d-flex justify-content-between align-items-center flex-wrap">
      <div className="d-flex gap-3">
        <a href="#" className="text-white text-decoration-none">SAVE MORE ON APP</a>
        <a href="#" className="text-white text-decoration-none">SELL ON DARAZ</a>
        <a href="#" className="text-white text-decoration-none">HELP & SUPPORT</a>
      </div>
      <div className="d-flex gap-3">
        <a href="#" className="text-white text-decoration-none">LOGIN</a>
        <a href="#" className="text-white text-decoration-none">SIGN UP</a>
        <a href="#" className="text-white text-decoration-none">زبان تبدیل کریں</a>
      </div>
    </div>

    {/* Main Navigation */}
    <nav className="navbar navbar-expand-lg navbar-dark bg-orange px-3 py-3 shadow">
      <Link className="navbar-brand fw-bold fs-3 d-flex align-items-center gap-2" to="/">
        <img
          src="https://lzd-img-global.slatic.net/us/domino/3b870cb043c7f8a9741cbf66329e294e.png"
          alt="Daraz Logo"
          style={{ height: "36px" ,marginLeft: "170px" }}
        />
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navMain">
   <form className="d-flex mx-auto w-50">
  <input
    className="form-control me-0 search-input"
    type="search"
    placeholder="Search in Daraz"
    aria-label="Search"
    style={{
      borderRadius: '0',
      height: '50px'
    }}
  />
  <button
    type="submit"
    className="search-button"
    style={{
      backgroundColor: '#FBBBA8',
      border: 'none',
      borderRadius: '0',
      width: '50px',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0
    }}
  >
    <i
      className="bi bi-search"
      style={{
        color: '#F55524',
        fontSize: '20px',
      }}
    ></i>
  </button>
</form>



        <ul className="navbar-nav ms-auto">
          <li className="nav-item" style={{marginRight: "170px"}}>
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
