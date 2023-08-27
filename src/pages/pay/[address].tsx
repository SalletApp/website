// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { Spinner, useToast } from "@chakra-ui/react";

import ScreenView from "src/components/Layout/ScreenView";
import Divider from "src/components/Shared/Divider";
import Flex from "src/components/Shared/Flex";
import useKeyPress from "src/hooks/useKeyPress";
import Container from "src/components/Layout/Container";
import Text from "src/components/Shared/Text";
import Token from "src/components/Token";
import Button from "src/components/Shared/Button";
import Hr from "src/components/Shared/Hr";
import Input from "src/components/Shared/Input";
import formatAmountNumber from "src/lib/formatAmountNumber";
import bigNumberTokenToString from "src/hooks/useUtils";
import { TOKEN_SYMBOL_BURN } from "src/utils/token";
import { useBlockchain } from "src/context/Blockchain";
import { useToken } from "src/context/Token";

const Pay = () => {
  const router = useRouter();
  const address = router.query.address as string;
  const listTokens = {
    nars: {
      name: TOKEN_SYMBOL_BURN,
    },
  };

  // Chakra
  const toast = useToast();

  // Context
  const { getGasPrice } = useBlockchain();
  const { sendTransaction, tokens } = useToken();

  // Tokens
  const [tokenSelected, setTokenSelected] = useState(null);

  // Component
  const [loading, setLoading] = useState(false);
  const [toAddress, setToAddress] = useState(address);
  const [mount, setMount] = useState(null);

  // Price
  const [gasPrice, setGasPrice] = useState();
  const [addressIsValid, setAddressIsValid] = useState(false);

  useEffect(() => {
    // setLoading(true);
    async function init() {
      try {
        const gasPrice = await getGasPrice();

        setGasPrice(gasPrice);
      } catch (error) {
        console.log("err", error);
      }
    }

    !gasPrice && init();
  }, [gasPrice]);

  useEffect(() => {
    if (address) {
      const isValid = ethers.utils.isAddress(address);
      setAddressIsValid(isValid);
    }
  }, [address]);

  useEffect(() => {
    setToAddress(null);
    setAddressIsValid(false);
  }, []);

  // useEffect(() => {
  //   const isValid = ethers.utils.isAddress(address);
  //   setAddressIsValid(isValid);
  // }, [toAddress]);

  useEffect(() => {
    setToAddress(null);
    setAddressIsValid(false);
  }, []);

  useEffect(() => {
    const isValid = ethers.utils.isAddress(address);
    setAddressIsValid(isValid);
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

  const [step, setStep] = useState("token");

  const enterPress = useKeyPress("Enter");
  const escapePress = useKeyPress("Escape");

  //
  useEffect(() => {
    if (escapePress) {
      handleCloseModal();
    }
  }, [escapePress]);

  useEffect(() => {
    if (enterPress) {
      switch (step) {
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
    router.push("/");
  };

  const handleChangeToken = () => {
    setTokenSelected("");
    setStep("token");
    setLoading(false);
    setMount(null);
  };

  const handleChangeAmount = () => {
    setStep("amount");
    setLoading(false);
    setMount(null);
  };

  const handleShowSumary = async () => {
    setLoading(true);
    try {
      const test = await getGasPrice();
      console.log("test", test);
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

            {/* Step Token */}
            {step === "token" ? (
              <>
                <Text size="large" isBold>
                  ¿Qué deseas enviar?
                </Text>
                <Divider y={16} />
                <Token
                  name="nars"
                  token={tokens?.nars}
                  price={1}
                  disabled={!toAddress}
                  onClick={setTokenSelected}
                  active={tokenSelected === "nars"}
                />
              </>
            ) : (
              step !== "address" && (
                <>
                  <Flex justify="space-between">
                    <Text size="small">Token</Text>
                    <Flex justify="end" align="center" gap={8}>
                      {tokenSelected && (
                        <Text isBold>{listTokens[tokenSelected]?.name}</Text>
                      )}

                      <div>
                        <Button
                          size="small"
                          type="bezeled"
                          onClick={handleChangeToken}
                        >
                          Cambiar
                        </Button>
                      </div>
                    </Flex>
                  </Flex>
                  <Hr />
                </>
              )
            )}

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
                    iconLeft={"ARS"}
                    value={mount}
                    onChange={(e) => setMount(e.target.value)}
                  />
                  {/* <InputWithToken value={mount} onChange={(e) => setMount(e.target.value)} /> */}
                </Flex>
                <Divider y={8} />
                <Flex justify="center" gap={4}>
                  <Text>Disponible: </Text>
                  <Text isBold>
                    $
                    {formatAmountNumber(
                      Number(bigNumberTokenToString(tokens?.nars))
                    )}
                  </Text>
                </Flex>
              </>
            ) : (
              step !== "token" && (
                <>
                  <Flex justify="space-between">
                    <Text size="small">Monto</Text>
                    <Flex justify="end" align="center" gap={8}>
                      <Text isBold>${Number(mount)?.toFixed(2)}</Text>

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
                  <Hr />
                  <Flex justify="space-between">
                    <Text size="small">Comision</Text>
                    <Text isBold>${Number(gasPrice).toFixed(2)}</Text>
                  </Flex>
                  <Hr />
                  <Flex justify="space-between">
                    <Text size="large" isBold>
                      Total
                    </Text>
                    <Text size="large" isBold>
                      ${(Number(mount) + Number(gasPrice)).toFixed(2)}
                    </Text>
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
            {step === "token" && (
              <Button
                onClick={() => tokenSelected && setStep("amount")}
                isDisabled={!tokenSelected}
              >
                {loading ? <Spinner /> : "Seleccionar"}
              </Button>
            )}
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

export default Pay;
