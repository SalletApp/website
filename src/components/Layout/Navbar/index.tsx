import Link from "next/link";
import React from "react";
import { Flex } from "@chakra-ui/react";

import Container from "src/components/Layout/Container";
import Text from "src/components/Shared/Text";
import Divider from "src/components/Shared/Divider";
import QrButton from "src/components/Shared/QrButton";
import IconHouse from "src/components/Icons/HOUSE";
import IconSettings from "src/components/Icons/SETTINGS";

import { useRouter } from "next/router";

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
  const router = useRouter();
  const isDashboardPage = router.pathname === "/dashboard";
  const isSettingsPage = router.pathname === "/settings";

  return (
    <Flex background="gray5">
      <Container>
        <Flex justify="center"  gap={10}>
          <Link
            href="/dashboard"
          >
            <Flex direction="column" align="center" gap={2}>
              <IconHouse
                color={
                  isDashboardPage
                    ? "var(--chakra-colors-primary)"
                    : "var(--chakra-colors-text)"
                }
                width="25"
                height="25"
              />
              <Text>Inicio</Text>
            </Flex>
          </Link>
          <div style={{ marginTop: -30, marginBottom: -30 }}>
            <QrButton />
          </div>
          <Link
            style={{ backgroundColor: "transparent" }}
            href="/settings"
            passHref
          >
            <Flex direction="column" align="center" gap={2}>
              <IconSettings
                color={
                  isSettingsPage
                    ? "var(--chakra-colors-primary)"
                    : "var(--chakra-colors-text)"
                }
                width="25"
                height="25"
              />
              <Text>Ajustes</Text>
            </Flex>
          </Link>
        </Flex>
        <Divider y={16} />
      </Container>
    </Flex>
  );
};

export default Component;
