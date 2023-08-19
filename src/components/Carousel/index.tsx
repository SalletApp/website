import React, { ReactElement, useState } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";

import styles from "./Carousel.module.css";

import Container from "src/components/Layout/Container";
import Button from "src/components/Shared/Button";
import Divider from "src/components/Shared/Divider";
import Flex from "src/components/Shared/Flex";

type FooterNextButtonProps = {
  brand?: string;
  disable?: boolean;
  text?: string;
};

type FooterPrevButtonProps = {
  type?: string;
  disable?: boolean;
  text?: string;
  onClick?: () => void;
};

type FooterStylesProps = {
  background?: string;
  nextButton?: FooterNextButtonProps;
  prevButton?: FooterPrevButtonProps;
};

interface CarouselProps {
  slides: Array<ReactElement>;
  onFinish?: () => void;
  background?: string;
  theme?: "light" | "dark";
  footerStyles?: FooterStylesProps;
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  onFinish,
  background,
  theme = "dark",
  footerStyles,
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const isLastSlide = currentSlide + 1 === slides.length;
  const nextSlide = () => {
    let idx = isLastSlide ? currentSlide : currentSlide + 1;

    if (idx === currentSlide) {
      onFinish();
      return;
    }
    goToSlide(idx);
  };

  const isFirstSlide = currentSlide - 1 < 0;
  const prevSlide = () => {
    const idx = isFirstSlide ? currentSlide : currentSlide - 1;
    goToSlide(idx);
  };

  const defaultFooterStyles: FooterStylesProps = {
    background: footerStyles?.background || "gray5",
    nextButton: {
      brand:
        footerStyles?.nextButton?.brand ||
        (isLastSlide ? "secondary" : "primary"),
      disable: footerStyles?.nextButton?.disable || false,
      text:
        footerStyles?.nextButton?.text ||
        (isLastSlide ? "Finalizar" : "Continuar"),
    },
    prevButton: {
      type: footerStyles?.prevButton?.type || "bezeledGray",
      disable:
        footerStyles?.prevButton?.disable !== undefined
          ? footerStyles?.prevButton?.disable
          : isFirstSlide,
      text:
        (footerStyles?.prevButton?.text &&
          isFirstSlide &&
          footerStyles?.prevButton?.text) ||
        "Anterior",
      onClick:
        footerStyles?.prevButton?.onClick && isFirstSlide
          ? footerStyles?.prevButton?.onClick
          : prevSlide,
    },
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
        <Flex background={defaultFooterStyles.background}>
          <Container>
            <Divider y={16} />
            <Flex
              direction={{ base: "column-reverse", md: "row" }}
              justify={"center"}
              gap={8}
            >
              <Button
                type={defaultFooterStyles.prevButton.type}
                onClick={defaultFooterStyles.prevButton.onClick}
                isDisabled={defaultFooterStyles.prevButton.disable}
              >
                {defaultFooterStyles.prevButton.text}
              </Button>

              <Button
                onClick={nextSlide}
                brand={defaultFooterStyles.nextButton.brand}
              >
                {defaultFooterStyles.nextButton.text}
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
