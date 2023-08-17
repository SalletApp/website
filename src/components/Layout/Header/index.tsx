import React from "react";
import { Flex, HStack, Box, Image } from "@chakra-ui/react";

import { useAccount } from "src/context/Account";

import Container from "src/components/Layout/Container";
import Link from "src/components/Shared/Link";
import Button from "src/components/Shared/Button";
import Text from "src/components/Shared/Text";
import Twitter from "src/components/Shared/Icons/Twitter";
import Discord from "src/components/Shared/Icons/Discord";

interface NavbarProps {
  title?: string;
  type?: "page" | "modal" | "minimalModal";
  onClose?: () => void;
}

const Component: React.FunctionComponent<NavbarProps> = ({
  title,
  type = "page",
  onClose,
}) => {
  // Context
  const { wallet } = useAccount();

  const isPage = type === "page";
  const isMinimalModal = type === "minimalModal";
  const isModal = type === "modal";

  return (
    <Flex w="100%">
      <Container>
        <Flex
          w="100%"
          h={"60px"}
          alignItems="center"
          justifyContent={isModal ? "flex-end" : "center"}
          paddingY={"50px"}
          paddingX={0}
        >
          {isPage && (
            <>
              <Image
                src="/logo.svg"
                alt="Sallet.app"
                width={"111px"}
                height={"40px"}
              />
            </>
          )}

          {isModal && (
            <HStack display="flex" justifyContent="flex-end">
              <Button
                size="small"
                type="borderless"
                onClick={onClose}
                tabIndex={1}
              >
                Cancelar
              </Button>
            </HStack>
          )}
        </Flex>
      </Container>
    </Flex>
  );
};

export default Component;
