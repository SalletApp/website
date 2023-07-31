import { useState, useEffect, CSSProperties } from 'react';
import { OnResultFunction, QrReader } from 'react-qr-reader';
import { useToast } from '@chakra-ui/react';

import Container from 'src/components/Layout/Container';

import Button from 'src/components/Shared/Button';
import Flex from 'src/components/Shared/Flex';

interface PropsQRCodeScanner {
  toAddress: string | null;
  setToAddress: (toAddress: string | null) => void;
  addressIsValid: boolean;
  isOpen: boolean;
  onClose: () => null;
}

export function QRCodeScanner({
  toAddress,
  setToAddress,
  addressIsValid,
  isOpen,
  onClose,
}: PropsQRCodeScanner): JSX.Element {
  // Chakra
  const toast = useToast();

  const [result, setResult] = useState<string>('');

  const isSucessful = addressIsValid && toAddress !== null && toAddress !== '' && result !== '';

  useEffect(() => {
    if (isSucessful) {
      toast({
        title: 'Perfecto',
        description: 'Billetera escaneada correctamente.',
        status: 'success',
        position: 'top',
        duration: 2000,
        isClosable: true,
      });
      onClose();
      setTimeout(() => {}, 2000);
    }
  }, [isSucessful]);

  const onResult: OnResultFunction = (result, error) => {
    if (result !== null && result !== undefined) {
      setToAddress(result?.getText());
      setResult(result?.getText());
      onClose();
    }

    if (error) {
      console.error(error);
    }
  };

  const constraints: MediaTrackConstraints = {
    facingMode: { ideal: 'environment' },
    aspectRatio: { ideal: 1 },
    sampleRate: { ideal: 180 },
    frameRate: { ideal: 180 },
    sampleSize: 16,
    channelCount: 2,
  };

  const overlayStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: isOpen ? 10 : -1,
    opacity: isOpen ? 1 : 0,
    overflow: 'hidden',

    width: '100vw',
    height: '100vh',

    background: 'var(--chakra-colors-background)',
  };

  const containerStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
  };

  const QrReaderStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  };

  const navbarStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: '60px',

    background: 'var(--chakra-colors-background)',
  };

  const boxExampleStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  };

  const exampleStyle: CSSProperties = {
    width: '250px',
    height: '250px',

    border: '2px solid var(--chakra-colors-gray35)',
    borderRadius: '8px',
  };

  return (
    <div style={overlayStyle}>
      <div style={containerStyle}>
        <nav style={navbarStyle}>
          <Container>
            <Flex justify='flex-end'>
              <div>
                <Button size='small' type='bezeled' onClick={onClose} tabIndex={1}>
                  Cancelar
                </Button>
              </div>
            </Flex>
          </Container>
        </nav>
        {isOpen && <QrReader constraints={constraints} onResult={onResult} containerStyle={QrReaderStyle} />}
        <div style={boxExampleStyle}>
          <div style={exampleStyle} />
        </div>
      </div>
    </div>
  );
}
