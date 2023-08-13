// @ts-nocheck
import { useEffect } from 'react';
import { Image } from '@chakra-ui/react';

import Navbar from 'src/components/Layout/Navbar';
import Text from 'src/components/Shared/Text';
import ScreenView from 'src/components/Layout/ScreenView';
import Flex from 'src/components/Shared/Flex';
import Divider from 'src/components/Shared/Divider';

import useKeyPress from 'src/hooks/useKeyPress';
import Carousel from 'src/components/Carousel';
import Heading from 'src/components/Shared/Heading';
import { db } from 'src/utils/db';

const Slide = ({ title, description, image }) => (
  <Flex direction='column' height='100%'>
    <Flex height='100%' align='center'>
      <Image src={image} alt={`${title} - Sallet.app`} />
    </Flex>
    <Divider y={8} />
    <Flex direction='column' align='center'>
      <Heading as='h3'>{title}</Heading>
      <Text align='center'>{description}</Text>
    </Flex>
  </Flex>
);

const Component = ({ onClose }) => {
  const escapePress = useKeyPress('Escape');

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
      <Navbar type='minimalModal' title='Testeando' onClose={handleCloseModal} />
      <ScreenView>
        <Carousel
          onFinish={handleSetOnboardingStatus}
          slides={[
            <Slide
              image='/img/wallet-onboarding.png'
              title='Billeteras'
              description='La billeras son como los CBU de las cuentas bancarias. Compartelo con quien desee enviarte crypto.'
            />,
            <Slide
              image='/img/token-onboarding.png'
              title='Tokens'
              description='Los tokens son como las monedas de los países. Existen miles, queda en nosotros en cuáles confiamos.'
            />,
            <Slide
              image='/img/seed-phrase-onboarding.png'
              title='Frase semilla'
              description='En crypto no tenemos usuario y contraseña, pero si un conjunto de 12 palabras. Guardalas sabiamente.'
            />,
          ]}
        />
      </ScreenView>
    </>
  );
};

export default Component;
