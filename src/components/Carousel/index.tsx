import React, { ReactElement, useState } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";

import styles from "./Carousel.module.css";

import Container from "src/components/Layout/Container";
import Button from "src/components/Shared/Button";
import Divider from "src/components/Shared/Divider";
import Flex from "src/components/Shared/Flex";

interface CarouselProps {
  slides: Array<ReactElement>;
  onFinish?: () => void;
  background?: string;
  theme?: "light" | "dark";
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  onFinish,
  background,
  theme = "dark",
}) => {
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
    <Flex direction="column" justify="space-between" style={{ height: "100%" }}>
      <Container size="small" height="100%" background={background}>
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
        <Divider y={16} />
        <Flex align="center" justify="center">
          {!onFinish && (
            <ArrowLeft onClick={prevSlide} className={styles.arrow} />
          )}
          <Flex justify="center" gap={8}>
            {slides.map((_, index) => (
              <div
                key={index}
                className={`${styles.chip} ${
                  theme === "dark"
                    ? index === currentSlide
                      ? styles.chipActiveDark
                      : styles.chipDark
                    : index === currentSlide
                    ? styles.chipActiveLight
                    : styles.chipLight
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </Flex>
          {!onFinish && (
            <ArrowRight onClick={nextSlide} className={styles.arrow} />
          )}
        </Flex>
        <Divider y={16} />
      </Container>
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

              <Button
                onClick={nextSlide}
                brand={
                  currentSlide + 1 === slides.length ? "secondary" : "primary"
                }
              >
                {currentSlide + 1 === slides.length ? "Finalizar" : "Continuar"}
              </Button>
            </Flex>
            <Divider y={16} />
          </Container>
        </Flex>
      )}
    </Flex>
  );
};

export default Carousel;
