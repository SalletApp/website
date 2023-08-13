import React, { ReactElement, useState } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";

import styles from "./Carousel.module.css";

import { Container } from "../Container";
import Button from "../Shared/Button";
import Divider from "../Shared/Divider";
import Flex from "../Shared/Flex";

interface CarouselProps {
  slides: Array<ReactElement>;
  onFinish?: () => void;
}

const Carousel: React.FC<CarouselProps> = ({ slides, onFinish }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const nextSlide = () => {
    let idx =
      currentSlide + 1 === slides.length ? currentSlide : currentSlide + 1;

    if (idx === currentSlide) {
      onFinish();
      return;
    }
    goToSlide(idx);
  };

  const prevSlide = () => {
    const idx = currentSlide - 1 < 0 ? currentSlide : currentSlide - 1;
    goToSlide(idx);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.carousel}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`${
                index === currentSlide ? styles.slideActive : styles.slide
              }`}
            >
              {slide}
            </div>
          ))}
        </div>
        <div
          className={styles.chipsContainer}
          style={{ justifyContent: !onFinish ? "space-between" : "center" }}
        >
          {!onFinish && (
            <ArrowLeft onClick={prevSlide} className={styles.arrow} />
          )}
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
          {!onFinish && (
            <ArrowRight onClick={nextSlide} className={styles.arrow} />
          )}
        </div>
      </div>
      <Divider y={26} />
      {onFinish && (
        <Flex background="gray5">
          <Container>
            <Divider y={16} />
            <Flex
              direction={{ base: "column-reverse", md: "row" }}
              justify={"center"}
              gap={8}
            >
              <Button
                type="bezeledGray"
                onClick={prevSlide}
                isDisabled={currentSlide - 1 < 0}
              >
                Anterior
              </Button>

              <Button onClick={nextSlide}>Continuar</Button>
            </Flex>
            <Divider y={16} />
          </Container>
        </Flex>
      )}
    </>
  );
};

export default Carousel;
