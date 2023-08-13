import { useState, useEffect } from "react";
import { Image } from "@chakra-ui/react";

import Button from "src/components/Shared/Button";
import Navbar from "src/components/Layout/Navbar";
import Text from "src/components/Shared/Text";
import ScreenView from "src/components/Layout/ScreenView";
import Container from "src/components/Layout/Container";
import Flex from "src/components/Shared/Flex";
import Divider from "src/components/Shared/Divider";

import useKeyPress from "src/hooks/useKeyPress";
import Carousel from "src/components/Carousel";
import Heading from "src/components/Shared/Heading";
import { db } from "src/utils/db";

const Slide = ({ title, description, image, imageWidth }) => (
  <div style={{ height: "100%" }}>
    <div style={{ height: "80%" }}>
      <Flex justify="flex-end">
        <Image src={image} alt={`${title} - Sallet.app`} width={imageWidth} />
      </Flex>
    </div>

    <Container>
      <Heading as="h2" align={{ base: "center" }}>
        Un paso adelante hacia la libertad financiera.
      </Heading>
      <Divider y={20} />
      <Text size="large" align="center">
        {description}
      </Text>
    </Container>
  </div>
);

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

  const handleSetOnboardingStatus = async () => {
    await db.wallets.update(1, { showOnboarding: false });
    onClose();
  };

  return (
    <>
      <Navbar type="modal" title="Testeando" onClose={handleCloseModal} />
      <ScreenView>
        <Divider y={32} />
        <Carousel
          onFinish={handleSetOnboardingStatus}
          slides={[
            <Slide
              image="/img/wallet-onboarding.png"
              imageWidth="70%"
              title="Billeteras."
              description="La billeras son como los CBU de las cuentas bancarias. Compartelo con quien desee enviarte crypto."
            />,
            <Slide
              image="/img/token-onboarding.png"
              imageWidth="50%"
              title="Tokens."
              description="Los tokens son como las monedas de los países. Existen miles, queda en nosotros en cuáles confiamos."
            />,
            <Slide
              image="/img/seed-phrase-onboarding.png"
              imageWidth="40%"
              title="Frase semilla."
              description="En crypto no tenemos usuario y contraseña, pero si un conjunto de 12 palabras. Guardalas sabiamente."
            />,
          ]}
        />
        <Divider y={32} />
      </ScreenView>

      {/* <Flex background="gray5">
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
      </Flex> */}
    </>
  );
};

export default Component;
