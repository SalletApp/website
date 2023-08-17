// @ts-nocheck
import { useState } from "react";
import Head from "next/head";
// import Image from 'next/image';
import { useRouter } from "next/router";
import { useToast, VStack, Spinner } from "@chakra-ui/react";

import { useAccount } from "../context/Account";

import Header from "src/components/Layout/Header";
import ScreenView from "src/components/Layout/ScreenView";
import Container from "src/components/Layout/Container";
import Button from "src/components/Shared/Button";
import Link from "src/components/Shared/Link";
import Input from "src/components/Shared/Input";
import Text from "src/components/Shared/Text";
import Heading from "src/components/Shared/Heading";
import Flex from "src/components/Shared/Flex";
import Divider from "src/components/Shared/Divider";

import * as gtag from "src/lib/gtag";
import { useTheme } from 'src/hooks/useTheme';
import { useParam } from 'src/hooks/useParam';
import { AllThemes } from 'src/types/useTheme';
import { useTemplate } from 'src/hooks/useTemplate';

const Create = () => {
  const router = useRouter();
  const toast = useToast();

  const { logo, name } = useTemplate();
  
  // Context
  const { wallet, createWallet } = useAccount();

  // Component
  const [password, setPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState("");

  const [showValidate, setShowValidate] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [loading, setLoading] = useState(false);

  if (wallet?.address) {
    router.push("/dashboard");
    return;
  }

  // Pass
  const handleSetPassword = (value) => {
    const data = value.target.value;
    // TO-DO: añadir validaciones min/max
    if (data) {
      setShowValidate(true);
      setPassword(data);
    }
  };

  // Verify
  const handleSetValidatePass = (value) => {
    const data = value.target.value;
    setValidatePassword(data);
    if (data === password) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    if (password === validatePassword) {
      const { success } = await createWallet(password);
      if (success) {
        const options = {
          action: "create",
          category: "form",
          label: "wallet_account",
          value: "",
        };

        gtag.event(options);
        router.push("/dashboard");
      } else {
        setLoading(false);
      }
    } else {
      toast({
        title: "Contraseña incorrecta",
        description: "Verifica que las contraseñas coincidan.",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });

      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ScreenView 
        justify="center" 
        align="center">
        <Spinner />
      </ScreenView>
    );
  }

  return (
    <>
      <Head>
        <title>{`Crear - ${name}`}</title>
      </Head>
      <Header logo={logo} />
      <ScreenView justify="center">
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          pt={{ base: "50px", md: "60px" }}
        >
          <Container size="small">
            <Flex
              flexDirection={"column"}
              justifyContent={{ base: "space-between", md: "center" }}
              gap={4}
            >
              <Flex direction="column">
                <Heading as="h2">Creemos una contraseña.</Heading>
                <Divider y={8} />
                <Text>
                  Si bien funcionamos únicamente en tu dispositivo, necesitamos
                  validar que realmente eres tú al momento de ingresar.
                </Text>
                <Divider y={16} />
                <Input
                  placeholder="Escribe una contraseña"
                  value={password}
                  onChange={handleSetPassword}
                  name="password"
                  type="text"
                  id="password"
                />
                <Divider y={8} />
                <Input
                  placeholder="Verifique la contraseña"
                  value={validatePassword}
                  onChange={handleSetValidatePass}
                  disabled={!showValidate}
                  name="validatePassword"
                  type="text"
                  id="validatePassword"
                />
              </Flex>
            </Flex>
          </Container>
        </Flex>
      </ScreenView>
      <Flex background="gray5">
        <Container>
          <Divider y={16} />
          <Flex
            direction={{ base: "column-reverse", md: "row" }}
            justify={"center"}
            gap={8}
          >
            <Link type="bezeled" href="/" passHref>
              Volver
            </Link>
            <Button
              variant="solid"
              isDisabled={!isValid || loading}
              onClick={handleConfirm}
            >
              {loading ? <Spinner /> : "Crear"}
            </Button>
          </Flex>
          <Divider y={16} />
        </Container>
      </Flex>
    </>
  );
};

export default Create;
