import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Text as TextDemo } from '@chakra-ui/react';
import { ArrowDown, ArrowUp } from 'react-feather';

import { useAccount } from '../context/Account';
import { useToken } from '../context/Token';

import Text from '../components/Shared/Text';
import ButtonCircle from '../components/Shared/ButtonCircle';
import Link from '../components/Shared/Link';

import Navbar from 'src/components/Layout/Navbar';
import Container from 'src/components/Layout/Container';
import ScreenView from 'src/components/Layout/ScreenView';
import FullModal from 'src/components/FullModal';
import Flex from 'src/components/Shared/Flex';
import Divider from 'src/components/Shared/Divider';
import Button from 'src/components/Shared/Button';

import Token from '../components/Token';

import { cryptoToUSD, formatPrice } from '../hooks/usePrice';

// import { getPrice } from './api/thegraph';
import { getPrices } from './api/prices';
import bigNumberTokenToString from 'src/hooks/useUtils';
import formatAmountNumber from 'src/lib/formatAmountNumber';

export async function getStaticProps() {
  // const { success, data } = await getPrices();

  return {
    props: {
      // price: {
      //   eth: data.find((token) => token.name === 'eth'),
      //   dai: data.find((token) => token.name === 'dai'),
      // },
    },
  };
}

const Dashboard = () => {
  const { wallet } = useAccount();
  const { tokens } = useToken();

  if (!tokens) return null;

  // General
  const [modalType, setModalType] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [typeModal, setTypeModal] = useState('');

  const handleOpenFullModal = (type) => {
    setTypeModal(type);
    setModalType(type);
    setOpenModal(true);
  };

  const handleCloseFullModal = () => {
    setOpenModal(false);
    setModalType('');
  };

  return (
    <>
      <Head>
        <title>Wallet - Sallet</title>
      </Head>
      <Navbar type={openModal ? 'modal' : 'page'} title={typeModal || ''} onClose={handleCloseFullModal} />
      <ScreenView justifyContent='center'>
        <Container size='small'>
          <Divider y={32} />
          {/* Balance */}
          <Flex direction='column' align='center'>
            <Flex direction='column' justify='center' align='center' gap={8}>
              {/* POC */}
              <TextDemo
                bg='terciary15'
                color='terciary'
                p='4px 12px'
                borderRadius={99}
                fontSize='14px'
                fontWeight={'bold'}
              >
                LaTestnet
              </TextDemo>
              <Text size='small'>Balance</Text>
            </Flex>
            <Divider y={16} />
            <Text fontSize={32} isBold>
              ${formatAmountNumber(Number(bigNumberTokenToString(tokens?.nars)))}
            </Text>
          </Flex>

          <Divider y={32} />

          {/* Botones */}
          <Flex justify='center'>
            <ButtonCircle brand='secondary' onClick={() => handleOpenFullModal('send')} title='Enviar'>
              <ArrowUp color='#111' />
            </ButtonCircle>
            <Divider x={16} />
            <ButtonCircle onClick={() => handleOpenFullModal('receive')} title='Recibir'>
              <ArrowDown color='#111' />
            </ButtonCircle>
          </Flex>

          <Divider y={32} />

          {/* Tokens */}
          <Text isBold>Tokens</Text>
          <Divider y={8} />
          <Token name='nars' token={tokens?.nars} price={tokens?.nars} readOnly />
          <Token name='token' token={tokens?.token} price={tokens?.token} readOnly />
          <Divider y={16} />
          <Flex>
            <Button isBlock type='bezeledGray'>
              Ver historial
            </Button>
          </Flex>
          <Divider y={32} />
        </Container>
      </ScreenView>

      {/* Security */}
      {wallet && !wallet?.backup && (
        <Flex background='terciary15'>
          <Container>
            <Divider y={16} />
            <Flex
              direction={{ base: 'column', md: 'row' }}
              align='center'
              justify={{ base: 'center', md: 'space-between' }}
            >
              <Text align={{ base: 'center', md: 'left' }}>
                Asegúrate de guardar tu frase semilla. <br />
                Es la llave a tus activos digitales.
              </Text>
              <Divider y={16} />
              <Link href='/settings/backup' brand='terciary' passHref>
                Guardar frase semilla
              </Link>
            </Flex>
            <Divider y={16} />
          </Container>
        </Flex>
      )}

      <FullModal type={modalType} open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default Dashboard;
