import { useState, useEffect } from "react";
import Button from "src/components/Shared/Button";

import Navbar from "src/components/Layout/Navbar";
import ScreenView from "src/components/Layout/ScreenView";
import Container from "src/components/Layout/Container";
import Flex from "src/components/Shared/Flex";
import Divider from "src/components/Shared/Divider";

import useKeyPress from "src/hooks/useKeyPress";
import Carousel from "src/components/Carousel";

const Slide = () => <h1>Hola</h1>;

const Component = ({ onClose }) => {
  const [disableContinue, setDisableContinue] = useState<boolean>(true);

  const escapePress = useKeyPress("Escape");

  useEffect(() => {
    if (escapePress) {
      handleCloseModal();
    }
  }, [escapePress]);

  const handleCloseModal = () => {
    onClose();
  };

  const continueToken = () => {};

  return (
    <>
      <Navbar type="modal" title="Testeando" onClose={handleCloseModal} />
      <ScreenView>
        <Divider y={32} />
        <Carousel slides={[<Slide />, <Slide />, <Slide />, <Slide />]} />
        <Divider y={32} />
      </ScreenView>

      <Flex background="gray5">
        <Container>
          <Divider y={16} />
          <Flex
            direction={{ base: "column-reverse", md: "row" }}
            justify={"center"}
            gap={8}
          >
            <Button type="bezeledGray" onClick={handleCloseModal}>
              Cancelar
            </Button>

            <Button onClick={continueToken} isDisabled={disableContinue}>
              Continuar
            </Button>
          </Flex>
          <Divider y={16} />
        </Container>
      </Flex>
    </>
  );
};

export default Component;
