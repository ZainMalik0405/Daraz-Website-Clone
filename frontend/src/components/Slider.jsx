import { useEffect } from "react";
import { Carousel } from 'bootstrap'; // ✅ Import only Carousel

const Slider = () => {
  useEffect(() => {
    const el = document.getElementById('promoCarousel');
    if (el) {
      new Carousel(el, {
        interval: 3000,
        ride: 'carousel',
        wrap: true,
        pause: 'hover'
      });
    }
  }, []);

  return (
    <div id="promoCarousel" className="carousel slide" style={{ width: "80%" , margin: "auto" }}>
      <div className="carousel-inner">
        {/* your original image slides with real URLs */}
        <div className="carousel-item active">
          <img src="https://img.lazcdn.com/us/domino/219c74df-5e45-4af1-81dd-8a7543455a87_PK-1976-688.jpg_2200x2200q80.jpg_.webp" className="d-block w-100" alt="Promo 1" />
        </div>
        <div className="carousel-item">
          <img src="https://img.lazcdn.com/us/domino/3c575370-f7a0-478b-9883-b66857c72595_PK-1976-688.jpg_2200x2200q80.jpg_.webp" className="d-block w-100" alt="Promo 2" />
        </div>
        <div className="carousel-item">
          <img src="https://img.lazcdn.com/us/domino/c899ccf5-390b-437c-b4a8-18e607508a32_PK-1976-688.jpg_2200x2200q80.jpg_.webp" className="d-block w-100" alt="Promo 3" />
        </div>
        <div className="carousel-item">
          <img src="https://img.lazcdn.com/us/domino/aec5d1e5-9674-41c5-a30d-979165dbd98a_PK-1976-688.jpg_2200x2200q80.jpg_.webp" className="d-block w-100" alt="Promo 4" />
        </div>
        <div className="carousel-item">
          <img src="https://img.lazcdn.com/us/domino/9a619a44-c8ca-45a9-8748-e7e3d62c5704_PK-1976-688.jpg_2200x2200q80.jpg_.webp" className="d-block w-100" alt="Promo 5" />
        </div>
        <div className="carousel-item">
          <img src="https://img.lazcdn.com/us/domino/f9a5045a-cbf7-4cc5-a3e7-32502cf69b4b_PK-1976-688.jpg_2200x2200q80.jpg_.webp" className="d-block w-100" alt="Promo 6" />
        </div>
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#promoCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#promoCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Slider;
