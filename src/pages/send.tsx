import { useState, useEffect } from "react";
import { Spinner, useToast } from "@chakra-ui/react";
import { ethers } from "ethers";

import { useToken } from "src/context/Token";

import Button from "src/components/Shared/Button";
import Text from "src/components/Shared/Text";

import ScreenView from "src/components/Layout/ScreenView";
import Container from "src/components/Layout/Container";
import Flex from "src/components/Shared/Flex";
import Input from "src/components/Shared/Input";
import Hr from "src/components/Shared/Hr";
import Divider from "src/components/Shared/Divider";

// import { getPrice } from 'src/pages/api/thegraph';
import { getPrices } from "src/pages/api/prices";

import useKeyPress from "src/hooks/useKeyPress";
import useTruncatedAddress from "src/hooks/useTruncatedAddress";
import bigNumberTokenToString from "src/hooks/useUtils";
import { QRCodeScanner } from "src/components/QRCodeScanner";
import formatAmountNumber from "src/lib/formatAmountNumber";
import { useRouter } from "next/router";

const Send = ({ onClose }) => {
  const router = useRouter();
  // Chakra
  const toast = useToast();

  // Context
  const { sendTransaction, tokens } = useToken();

  // Tokens
  const tokenSelected = "nars";

  // Component
  const [loading, setLoading] = useState(false);
  const [toAddress, setToAddress] = useState(null);
  const [mount, setMount] = useState(null);

  // Price
  const [addressIsValid, setAddressIsValid] = useState(false);

  useEffect(() => {
    const isValid = ethers.utils.isAddress(toAddress);
    setAddressIsValid(isValid);
    if (isValid) {
      setStep("amount");
    }
  }, [toAddress]);

  // Send transaction
  const handleSendTransaction = async () => {
    setLoading(true);

    if (toAddress && mount) {
      const { success, error } = await sendTransaction(
        toAddress,
        mount,
        tokenSelected
      );
      if (success) {
        toast({
          description: "Transacción enviada",
          status: "success",
          position: "top",
          duration: 2000,
        });
        setLoading(false);
        handleCloseModal();
      } else {
        setLoading(false);
        if (error?.code === "INSUFFICIENT_FUNDS") {
          toast({
            title: "Fondos insuficientes.",
            description: "No hemos detectado fondos en su cuenta y/o token.",
            status: "warning",
            position: "top",
            duration: 4000,
          });
        }
      }
    }
  };

  const [step, setStep] = useState("address");

  const enterPress = useKeyPress("Enter");

  useEffect(() => {
    if (enterPress) {
      switch (step) {
        case "address":
          toAddress !== null &&
            toAddress !== "" &&
            addressIsValid &&
            setStep("token");
          break;
        case "token":
          tokenSelected && setStep("amount");
          break;
        case "amount":
          setStep("sumary");
          break;
        case "sumary":
          setStep("success");
          break;
      }
    }
  }, [enterPress]);

  const handleCloseModal = () => {
    router.push("/dashboard");
  };

  const handleChangeAddress = () => {
    setToAddress(null);
    setMount(null);
    setLoading(false);
    setStep("address");
  };

  const handleChangeToken = () => {
    setStep("token");
    setLoading(false);
    setMount(null);
  };

  const handleChangeAmount = () => {
    setStep("amount");
    setLoading(false);
    setMount(null);
  };

  const continueToken = () => {
    if (toAddress === null || toAddress === "") {
      toast({
        title: "Advertencia",
        description: "El campo de texto está vacío",
        status: "warning",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    }

    if (!addressIsValid && toAddress !== null && toAddress !== "") {
      toast({
        title: "Error",
        description: "La dirección de esta billetera es incorrecta o inválida",
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    }

    if (toAddress && addressIsValid) setStep("token");
  };

  const handleShowSumary = async () => {
    setLoading(true);
    try {
      setLoading(false);
      setStep("sumary");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <ScreenView justifyContent={{ base: "flex-start", md: "center" }}>
        <Container size="small">
          <Divider y={32} />
          <Flex direction="column" gap="10px">
            {/* Step Account */}

            {!addressIsValid ? (
              <QRCodeScanner
                toAddress={toAddress}
                setToAddress={setToAddress}
                isOpen={true}
                addressIsValid={addressIsValid}
                onClose={handleCloseModal}
              />
            ) : (
              <>
                <Flex justify="space-between" align="center">
                  {/* <AddressBox title='Destino' address={toAddress} /> */}
                  <Text size="small">Destino</Text>
                  <Flex align="center" justify="end" gap={8}>
                    <Text isBold>{useTruncatedAddress(toAddress)}</Text>
                    <div>
                      <Button
                        size="small"
                        type="bezeled"
                        onClick={handleChangeAddress}
                      >
                        Cambiar
                      </Button>
                    </div>
                  </Flex>
                </Flex>
                <Hr />
              </>
            )}

            {/* Step Token */}

            {step === "amount" ? (
              <>
                <Text size="large" isBold>
                  ¿Cuánto deseas enviar?
                </Text>
                <Divider y={16} />
                <Flex gap={8}>
                  <div>
                    <Button brand="secondary" type="bezeled" fontSize="12px">
                      Max
                    </Button>
                  </div>
                  <Input
                    type="number"
                    autoFocus
                    placeholder="0.00"
                    iconLeft={"LOLA"}
                    value={mount}
                    onChange={(e) => setMount(e.target.value)}
                  />
                  {/* <InputWithToken value={mount} onChange={(e) => setMount(e.target.value)} /> */}
                </Flex>
                <Divider y={8} />
                <Flex justify="center" gap={4}>
                  <Text>Disponible: </Text>
                  <Text isBold>
                    {formatAmountNumber(
                      Number(bigNumberTokenToString(tokens?.nars))
                    )}
                  </Text>
                </Flex>
              </>
            ) : (
              step !== "address" &&
              step !== "token" && (
                <>
                  <Flex justify="space-between">
                    <Text size="small">Monto</Text>
                    <Flex justify="end" align="center" gap={8}>
                      <Text isBold>{Number(mount)?.toFixed(2)}</Text>

                      <div>
                        <Button
                          size="small"
                          type="bezeled"
                          onClick={handleChangeAmount}
                        >
                          Cambiar
                        </Button>
                      </div>
                    </Flex>
                  </Flex>
                </>
              )
            )}
          </Flex>
          <Divider y={32} />
        </Container>
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

            {step === "amount" && (
              <Button
                onClick={handleShowSumary}
                isDisabled={
                  !mount ||
                  mount === "0" ||
                  mount === "0." ||
                  mount === "." ||
                  mount === "," ||
                  !addressIsValid
                }
              >
                {loading ? <Spinner /> : "Continuar"}
              </Button>
            )}
            {step === "sumary" && (
              <Button
                brand="secondary"
                isLoading={loading}
                onClick={handleSendTransaction}
              >
                {loading ? <Spinner /> : "Transferir"}
              </Button>
            )}
          </Flex>
          <Divider y={16} />
        </Container>
      </Flex>
    </>
  );
};

export default Send;
