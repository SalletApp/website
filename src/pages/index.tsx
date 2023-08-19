import { useRouter } from "next/router";

import { useAccount } from "../context/Account";

import Container from "src/components/Layout/Container";
import ScreenView from "src/components/Layout/ScreenView";
import Heading from "src/components/Shared/Heading";
import Text from "src/components/Shared/Text";
import Flex from "src/components/Shared/Flex";
import Divider from "src/components/Shared/Divider";
import Link from "src/components/Shared/Link";

import Header from "src/components/Layout/Header";
import { useTemplate } from "src/hooks/useTemplate";

const Index = () => {
  const router = useRouter();
  const { logo, name } = useTemplate();

  // Context
  const { wallet } = useAccount();

  if (!!wallet?.account) {
    router.push("/dashboard");
    return false;
  }

  return (
    <>
      <Header logo={logo} />
      <ScreenView justify="center">
        <Container height={{ base: "100%", md: "auto" }}>
          <Flex
            direction={"column"}
            flex={{ base: 1, md: "inherit" }}
            justify="center"
            maxWidth="500px"
          >
            <Heading as="h1" align={{ base: "center", md: "left" }}>
              Un paso adelante hacia la libertad financiera.
            </Heading>
            <Divider y={8} />
            <Text size="large" align={{ base: "center", md: "left" }}>
              Gestionar tus cripto-activos nunca ha sido tan sencillo y seguro.
              ¡Tu poder financiero en tus manos!
            </Text>
          </Flex>
          <Divider y={16} />
          <Flex direction={{ base: "column-reverse", md: "row" }} gap={8}>
            <Link href="/signin" type="bezeled" passHref>
              Ya tengo una billetera
            </Link>
            <Link href="/create" passHref>
              Crear billetera
            </Link>
          </Flex>
          <Divider y={16} />
        </Container>
      </ScreenView>
    </>
  );
};

export default Index;
