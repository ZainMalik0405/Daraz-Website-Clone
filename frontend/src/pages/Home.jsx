import Slider from "../components/Slider.jsx";
import PromoBanner from "../components/PromoBanner.jsx";
import FlashSale from "../components/FlashSale.jsx";

const Home = () => (
  <>
    <Slider />
    <PromoBanner />
    <FlashSale />

    <div className="container mt-4">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 text-orange fw-bold">Welcome to Daraz Clone</h1>
        <p className="lead">Explore top deals, categories, and new arrivals — all in one place.</p>
        <a href="/products" className="btn btn-warning btn-lg">Shop Now</a>
      </div>

      {/* Categories Preview */}
      <h2 className="mb-4 fw-bold">Top Categories</h2>
      <div className="row">
        {["Electronics", "Fashion", "Home", "Beauty"].map((cat, i) => (
          <div className="col-6 col-md-3 mb-4" key={i}>
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <h5 className="card-title">{cat}</h5>
                <p className="card-text">Explore the best of {cat}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

export default Home;
