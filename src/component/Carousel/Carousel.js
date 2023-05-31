import React from "react";

export default function Carousel() {
  return (
    <div>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://onemg.gumlet.io/5c502a51-faa4-4500-b76d-55b3e86da635_1675762001.jpg?w=995&h=250&format=auto"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://onemg.gumlet.io/71713dd9-decf-43fb-8e90-4123959f07b5_1681191077.png?w=995&h=250&format=auto"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://onemg.gumlet.io/dab84002-50fd-49c2-a04b-ea5261117839_1685364375.png?w=995&h=250&format=auto"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://onemg.gumlet.io/33eab3f0-49a1-476d-8c1f-2fe4159bcf4d_1679394544.png?w=995&h=250&format=auto"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://onemg.gumlet.io/a_ignore,w_995,h_250,c_fit,q_auto,f_auto/63d38c8e-3043-4cc7-9bfd-0329568be44e.png"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
