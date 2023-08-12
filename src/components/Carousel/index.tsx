import React, { ReactElement, useState } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";

import styles from "./Carousel.module.css";

interface CarouselProps {
  slides: Array<ReactElement>;
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const nextSlide = () => {
    let idx =
      currentSlide + 1 === slides.length ? currentSlide : currentSlide + 1;
    goToSlide(idx);
  };

  const prevSlide = () => {
    const idx = currentSlide - 1 < 0 ? currentSlide : currentSlide - 1;
    goToSlide(idx);
  };

  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`${
              index === currentSlide ? styles.slideActive : styles.slide
            }`}
          >
            <p>{slide}</p>
          </div>
        ))}
      </div>
      <div className={styles.chipsContainer}>
        <ArrowLeft onClick={prevSlide} className={styles.arrow} />
        <div className={styles.chips}>
          {slides.map((_, index) => (
            <div
              key={index}
              className={`${styles.chip} ${
                index === currentSlide ? styles.chipActive : styles.chip
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
        <ArrowRight onClick={nextSlide} className={styles.arrow} />
      </div>
    </div>
  );
};

export default Carousel;
