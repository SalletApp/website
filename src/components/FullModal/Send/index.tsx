// @ts-nocheck
import { useState, useEffect } from 'react';
import { Spinner, useToast } from '@chakra-ui/react';
import { ethers } from 'ethers';

import { useBlockchain } from 'src/context/Blockchain';
import { useToken } from 'src/context/Token';

import Button from 'src/components/Shared/Button';
import Text from 'src/components/Shared/Text';

import Token from 'src/components/Token';

import InputWithButton from 'src/components/InputWithButton';
import Navbar from 'src/components/Layout/Navbar';
import ScreenView from 'src/components/Layout/ScreenView';
import Container from 'src/components/Layout/Container';
import Flex from 'src/components/Shared/Flex';
import Input from 'src/components/Shared/Input';
import Hr from 'src/components/Shared/Hr';
import Divider from 'src/components/Shared/Divider';
import QR from 'src/components/Icons/QR';

import { cryptoToUSD } from 'src/hooks/usePrice';

// import { getPrice } from 'src/pages/api/thegraph';
import { getPrices } from 'src/pages/api/prices';

import useKeyPress from 'src/hooks/useKeyPress';
import useTruncatedAddress from 'src/hooks/useTruncatedAddress';
import bigNumberTokenToString from 'src/hooks/useUtils';
import { QRCodeScanner } from 'src/components/QRCodeScanner';

const Component = ({ onClose }) => {
  // Chakra
  const toast = useToast();

  // Context
  const { getGasPrice, kovanProvider } = useBlockchain();
  const { sendTransaction, tokens, providerDAI } = useToken();

  // Tokens
  const [tokenSelected, setTokenSelected] = useState(null);
  const [totalTokensUSD, setTotalTokensUSD] = useState({
    eth: 0.0,
    dai: 0.0,
  });

  // Component
  const [loading, setLoading] = useState(false);
  const [toAddress, setToAddress] = useState(null);
  const [mount, setMount] = useState(null);

  // Price
  const [price, setPrice] = useState({ eth: 0, dai: 0 });
  const [gasPrice, setGasPrice] = useState();
  const [addressIsValid, setAddressIsValid] = useState(false);
  const [openReaderQR, setOpenReaderQR] = useState(false);

  useEffect(() => {
    // setLoading(true);
    async function init() {
      try {
        const gasPrice = await getGasPrice();
        const { success, data } = await getPrices();

        if (success) {
          const prices = {
            eth: data.find((token) => token.name === 'eth'),
            dai: data.find((token) => token.name === 'dai'),
          };

          setGasPrice(gasPrice);
          setPrice({ eth: prices?.eth?.values?.bid, dai: prices?.dai?.values?.bid });
          // setPriceETH(eth?.usd);

          setTotalTokensUSD({
            eth: cryptoToUSD(prices?.eth?.values?.bid, tokens.eth),
            dai: cryptoToUSD(prices?.dai?.values?.bid, tokens.dai),
          });
        }
      } catch (error) {
        console.log('err', error);
      }
    }

    !gasPrice && !price.eth && !price.dai && init();
  }, [gasPrice, totalTokensUSD]);

  useEffect(() => {
    setToAddress(null);
    setAddressIsValid(false);
  }, []);

  useEffect(() => {
    const isValid = ethers.utils.isAddress(toAddress);
    setAddressIsValid(isValid);
  }, [toAddress]);

  // Send transaction
  const handleSendTransaction = async () => {
    setLoading(true);

    const mountToToken = (Number(mount) * price.dai) / price[tokenSelected];

    if (toAddress && mount) {
      const { success, error } = await sendTransaction(toAddress, mountToToken, tokenSelected);
      if (success) {
        toast({ description: 'Transacción enviada', status: 'success' });
        setLoading(false);
        handleCloseModal();
      } else {
        setLoading(false);
        if (error?.code === 'INSUFFICIENT_FUNDS') {
          toast({
            title: 'Fondos insuficientes.',
            description: 'No hemos detectado fondos en su cuenta y/o token.',
            status: 'warning',
            position: 'top',
            duration: 4000,
          });
        }
      }
    }
  };

  const [step, setStep] = useState('address');

  const enterPress = useKeyPress('Enter');
  const escapePress = useKeyPress('Escape');

  //
  useEffect(() => {
    if (escapePress) {
      handleCloseModal();
    }
  }, [escapePress]);

  useEffect(() => {
    if (enterPress) {
      switch (step) {
        case 'address':
          toAddress !== null && toAddress !== '' && addressIsValid && setStep('token');
          break;
        case 'token':
          tokenSelected && setStep('amount');
          break;
        case 'amount':
          setStep('sumary');
          break;
        case 'sumary':
          setStep('success');
          break;
      }
    }
  }, [enterPress]);

  const handleCloseModal = () => {
    setMount(null);
    setToAddress(null);
    setGasPrice(null);
    setLoading(false);
    setTokenSelected('');
    setStep('address');
    setOpenReaderQR(false);
    onClose();
  };

  const handleChangeAddress = () => {
    setTokenSelected('');
    setToAddress(null);
    setMount(null);
    setLoading(false);
    setStep('address');
  };

  const handleChangeToken = () => {
    setTokenSelected('');
    setStep('token');
    setLoading(false);
    setMount(null);
  };

  const handleChangeAmount = () => {
    setStep('amount');
    setLoading(false);
    setMount(null);
  };

  const continueToken = () => {
    if (toAddress === null || toAddress === '') {
      toast({
        title: 'Advertencia',
        description: 'El campo de texto está vacío',
        status: 'warning',
        position: 'top',
        duration: 200,
        isClosable: true,
      });
    }

    if (!addressIsValid && toAddress !== null && toAddress !== '') {
      toast({
        title: 'Error',
        description: 'La dirección de esta billetera es incorrecta o inválida',
        status: 'error',
        position: 'top',
        duration: 200,
        isClosable: true,
      });
    }

    if (toAddress && addressIsValid) setStep('token');
  };

  const handleShowSumary = async () => {
    setLoading(true);
    try {
      const test = await getGasPrice();
      console.log('test', test);
      setLoading(false);
      setStep('sumary');
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleShowReaderQR = () => {
    setOpenReaderQR(!openReaderQR);
  };

  return (
    <>
      <Navbar type='modal' title='Testeando' onClose={handleCloseModal} />
      <ScreenView justifyContent={{ base: 'flex-start', md: 'center' }}>
        <Container size='small'>
          <Divider y={32} />
          <Flex direction='column' gap='10px'>
            {/* Step Account */}
            {step === 'address' ? (
              <>
                {' '}
                <QRCodeScanner
                  toAddress={toAddress}
                  setToAddress={setToAddress}
                  isOpen={openReaderQR}
                  addressIsValid={addressIsValid}
                  onClose={handleShowReaderQR}
                />
                <Flex gap={8}>
                  <InputWithButton
                    placeholder='Ingresa una billetera'
                    value={toAddress}
                    onChange={setToAddress}
                    onClick={setToAddress}
                    addressIsValid={addressIsValid}
                    setAddressIsValid={setAddressIsValid}
                  />
                  <div>
                    <Button type='bezeled' onClick={handleShowReaderQR}>
                      <QR />
                    </Button>
                  </div>
                </Flex>
                <Divider y={16} />
                <Text align='center'>
                  <strong>Verifica</strong> siempre los últimos 3 caracteres.
                </Text>
              </>
            ) : (
              <>
                <Flex justify='space-between' align='center'>
                  {/* <AddressBox title='Destino' address={toAddress} /> */}
                  <Text size='small'>Destino</Text>
                  <Flex align='center' justify='end' gap={8}>
                    <Text isBold>{useTruncatedAddress(toAddress)}</Text>
                    <div>
                      <Button size='small' type='bezeled' onClick={handleChangeAddress}>
                        Cambiar
                      </Button>
                    </div>
                  </Flex>
                </Flex>
                <Hr />
              </>
            )}

            {/* Step Token */}
            {step === 'token' ? (
              <>
                <Text size='large' isBold>
                  ¿Qué deseas enviar?
                </Text>
                <Divider y={16} />
                <Token
                  name='eth'
                  token={tokens?.eth}
                  price={totalTokensUSD?.eth}
                  disabled={!toAddress}
                  onClick={setTokenSelected}
                  active={tokenSelected === 'eth'}
                />
                <Divider y={8} />
                <Token
                  name='dai'
                  token={tokens?.dai}
                  price={totalTokensUSD?.dai}
                  disabled={!toAddress}
                  onClick={setTokenSelected}
                  active={tokenSelected === 'dai'}
                />
              </>
            ) : (
              step !== 'address' && (
                <>
                  <Flex justify='space-between'>
                    <Text size='small'>Token</Text>
                    <Flex justify='end' align='center' gap={8}>
                      <Text isBold>{tokenSelected.toUpperCase()}</Text>

                      <div>
                        <Button size='small' type='bezeled' onClick={handleChangeToken}>
                          Cambiar
                        </Button>
                      </div>
                    </Flex>
                  </Flex>
                  <Hr />
                </>
              )
            )}

            {step === 'amount' ? (
              <>
                <Text size='large' isBold>
                  ¿Cuánto deseas enviar?
                </Text>
                <Divider y={16} />
                <Flex gap={8}>
                  <div>
                    <Button brand='secondary' type='bezeled' fontSize='12px'>
                      Max
                    </Button>
                  </div>
                  <Input
                    type='number'
                    autoFocus
                    placeholder='0.00'
                    iconLeft={'USD'}
                    value={mount}
                    onChange={(e) => setMount(e.target.value)}
                  />
                  {/* <InputWithToken value={mount} onChange={(e) => setMount(e.target.value)} /> */}
                </Flex>
                <Divider y={8} />
                <Flex justify='center' gap={4}>
                  <Text>Disponible: </Text>
                  <Text isBold>${Number(totalTokensUSD[tokenSelected]).toFixed(2)}</Text>
                </Flex>
              </>
            ) : (
              step !== 'address' &&
              step !== 'token' && (
                <>
                  <Flex justify='space-between'>
                    <Text size='small'>Monto</Text>
                    <Flex justify='end' align='center' gap={8}>
                      <Text isBold>USD {Number(mount)?.toFixed(2)}</Text>

                      <div>
                        <Button size='small' type='bezeled' onClick={handleChangeAmount}>
                          Cambiar
                        </Button>
                      </div>
                    </Flex>
                  </Flex>
                  <Hr />
                  <Flex justify='space-between'>
                    <Text size='small'>Comision</Text>
                    <Text isBold>USD {0.01}</Text>
                  </Flex>
                  <Hr />
                  <Flex justify='space-between'>
                    <Text size='large' isBold>
                      Total
                    </Text>
                    <Text size='large' isBold>
                      ${(Number(mount) * price.dai + Number(gasPrice) * price[tokenSelected]).toFixed(2)}
                    </Text>
                  </Flex>
                </>
              )
            )}
          </Flex>
          <Divider y={32} />
        </Container>
      </ScreenView>

      <Flex background='gray5'>
        <Container>
          <Divider y={16} />
          <Flex direction={{ base: 'column-reverse', md: 'row' }} justify={'center'} gap={8}>
            <Button type='bezeledGray' onClick={handleCloseModal}>
              Cancelar
            </Button>
            {step === 'address' && (
              <Button onClick={continueToken} isDisabled={!toAddress}>
                {loading ? <Spinner /> : 'Continuar'}
              </Button>
            )}
            {step === 'token' && (
              <Button onClick={() => tokenSelected && setStep('amount')} isDisabled={!tokenSelected}>
                {loading ? <Spinner /> : 'Seleccionar'}
              </Button>
            )}
            {step === 'amount' && (
              <Button
                onClick={handleShowSumary}
                isDisabled={
                  !mount || mount === '0' || mount === '0.' || mount === '.' || mount === ',' || !addressIsValid
                }
              >
                {loading ? <Spinner /> : 'Continuar'}
              </Button>
            )}
            {step === 'sumary' && (
              <Button brand='secondary' isLoading={loading} onClick={handleSendTransaction}>
                {loading ? <Spinner /> : 'Transferir'}
              </Button>
            )}
          </Flex>
          <Divider y={16} />
        </Container>
      </Flex>
    </>
  );
};

export default Component;
