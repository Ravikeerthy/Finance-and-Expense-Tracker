import React from "react";
import "./StyleBenefits.css";

const Testimonial = () => {
  const testimonials = [
    {
      name: "John Doe",
      feedback:
        "This expense tracker has changed my financial habits for the better!",
    },
    {
      name: "Jane Smith",
      feedback: "I love how easy it is to track my expenses and income.",
    },
    {
      name: "Emily Johnson",
      feedback: "A fantastic tool for budgeting and saving!",
    },
  ];
  return (
    <div>
      <div
        id="testimonialCarousel"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          {testimonials.map((testimonial, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <div className="d-flex flex-column align-items-center">
                <p className="testimonial-feedback text-center">
                  "{testimonial.feedback}"
                </p>
                <h5 className="testimonial-name">- {testimonial.name}</h5>
              </div>
            </div>
          ))}
        </div>
        <a
          className="carousel-control-prev"
          href="#testimonialCarousel"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#testimonialCarousel"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default Testimonial;
