// @ts-nocheck
import { useState } from "react";
import { ethers } from "ethers";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDisclosure, useToast, Checkbox, Image } from "@chakra-ui/react";

import { useAccount } from "src/context/Account";
import { db } from "src/utils/db";
import { decrypt } from "src/hooks/useCrypto";

import Navbar from "src/components/Layout/Navbar";
import Container from "src/components/Layout/Container";
import ScreenView from "src/components/Layout/ScreenView";
import Modal from "src/components/Modal";
import Heading from "src/components/Shared/Heading";
import Text from "src/components/Shared/Text";
import Link from "src/components/Shared/Link";
import Flex from "src/components/Shared/Flex";
import Divider from "src/components/Shared/Divider";
import Button from "src/components/Shared/Button";
import Mnemonic from "src/components/Mnemonic";
import Carousel from "src/components/Carousel";

const OnboardingSlide = ({ image, title, description }) => (
  <Flex
    style={{ backgroundColor: "var(--chakra-colors-primary)" }}
    direction="column"
    height="100%"
  >
    <Flex height="100%" align="center" justify="center">
      <Image src={image} alt={`${title} - Sallet.app`} />
    </Flex>

    <Flex direction="column" align="center">
      <Heading color="#111111" as="h3">
        {title}
      </Heading>
      <Text color="#111111" align="center">
        {description}
      </Text>
    </Flex>
    <Divider y={20} />
  </Flex>
);

const Backup = () => {
  const router = useRouter();
  // Chakra
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { wallet } = useAccount();

  const mnemonic = decrypt(wallet?.account?.seedPhrase)?.replaceAll('"', "");

  const [hasSave, setHasSave] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(true);

  const [showMnemonic, setShowMnemonic] = useState(false);
  const [showValidateMnemonic, setShowValidateMnemonic] = useState(false);

  const [localMnemonic, setLocalMnemonic] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const handleChangeMnemonic = (value, index) => {
    let newMnemonic = localMnemonic;
    newMnemonic[index] = value;
    setLocalMnemonic(newMnemonic);
  };

  const handleSubmit = async (localMnemonic) => {
    const isValid = ethers.utils.isValidMnemonic(localMnemonic.join(" "));
    if (isValid) {
      await db.wallets.update(1, { backup: true });
      onOpen();
    } else {
      toast({
        title: "Frase semilla incorrecta.",
        description: "Verifique que la frase semilla sea correcta.",
        status: "warning",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleShowMnemonic = () => {
    setShowOnboarding(false);
    setShowMnemonic(true);
  };

  const handleConfirmSaveMnemonic = () => {
    setShowValidateMnemonic(true);
    setLocalMnemonic(["", "", "", "", "", "", "", "", "", "", "", ""]);
  };

  if (!wallet) return;

  return (
    <>
      <Head>
        <title>Backup - Sallet</title>
      </Head>
      <Navbar />
      {!showOnboarding && (
        <ScreenView justify="center">
          <Container size="small">
            {showMnemonic &&
              (showValidateMnemonic ? (
                <>
                  <Heading as="h2">¡Verifiquemos juntos!</Heading>
                  <Divider y={8} />
                  <Text size="large">
                    Escribe en orden las palabras que guardamos para verificar
                    que realmente lo hemos hecho bien.
                  </Text>
                </>
              ) : (
                <>
                  <Heading as="h2">Frase semilla.</Heading>
                  <Divider y={8} />
                  <Text size="large">
                    La frase semilla es un grupo de 12 palabras que son la llave
                    principal de tus activos.
                  </Text>
                </>
              ))}
            {showMnemonic && showValidateMnemonic && (
              <>
                <Divider y={16} />
                <Mnemonic
                  mnemonic={localMnemonic}
                  handleChange={handleChangeMnemonic}
                  readOnly={false}
                />
              </>
            )}
            {showMnemonic && !showValidateMnemonic && (
              <>
                <Divider y={16} />
                <Mnemonic mnemonic={mnemonic?.split(" ")} readOnly={true} />
                <Checkbox
                  size="lg"
                  width="100%"
                  justifyContent="space-between"
                  color="#fff"
                  bg="#1F1F1F"
                  p="20px"
                  borderRadius="4px"
                  onChange={() => setHasSave(!hasSave)}
                >
                  Confirmo haberlas guardado.
                </Checkbox>
              </>
            )}
          </Container>
        </ScreenView>
      )}

      {showOnboarding && (
        <Carousel
          theme="light"
          onFinish={handleShowMnemonic}
          background="var(--chakra-colors-primary)"
          footerStyles={{
            nextButton: {
              text: "Continuar",
              brand: "primary",
            },
            prevButton: {
              disable: false,
              text: "Más tarde",
              onClick: () => router.push("/dashboard"),
            },
          }}
          slides={[
            <OnboardingSlide
              image="/backup.png"
              title="Not your keys, not your coins"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            />,
            <OnboardingSlide
              image="/backup.png"
              title="Not your keys, not your coins"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            />,
            <OnboardingSlide
              image="/backup.png"
              title="Not your keys, not your coins"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            />,
          ]}
        />
      )}

      {!showOnboarding && (
        <Flex background="gray5">
          <Container>
            <Divider y={16} />
            <Flex
              direction={{ base: "column-reverse", md: "row" }}
              justify={"center"}
              gap={8}
            >
              <Link href="/dashboard" type="bezeledGray" passHref>
                Más tarde
              </Link>
              {!showMnemonic && (
                <Button onClick={handleShowMnemonic}>Continuar</Button>
              )}
              {showMnemonic && !showValidateMnemonic && (
                <Button
                  isDisabled={!hasSave}
                  onClick={handleConfirmSaveMnemonic}
                >
                  Continuar
                </Button>
              )}
              {showMnemonic && showValidateMnemonic && (
                <Button
                  brand="secondary"
                  onClick={() => handleSubmit(localMnemonic)}
                >
                  Validar
                </Button>
              )}
            </Flex>
            <Divider y={16} />
          </Container>
        </Flex>
      )}

      <Modal type="backup" isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Backup;
