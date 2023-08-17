import { Box } from "@chakra-ui/react";

import Text from "src/components/Shared/Text";
import Flex from "src/components/Shared/Flex";

import IconETH from "src/components/Icons/ETH";
import IconDAI from "src/components/Icons/DAI";
import IconNARS from "src/components/IconsFlag/ARG";
import IconTLA from "src/components/IconsFlag/TLA";

import bigNumberTokenToString from "src/hooks/useUtils";
import formatAmountNumber from "src/lib/formatAmountNumber";

const listTokens = {
  eth: {
    name: "Ethereum",
    symbol: "ETH",
    icon: <IconETH />,
    typeToken: true,
    decimal: 4,
  },
  dai: {
    name: "DAI",
    symbol: "DAI",
    icon: <IconDAI />,
    typeToken: true,
    decimal: 2,
  },
  nars: {
    name: "Peso Argentino",
    symbol: "nARS",
    icon: <IconNARS />,
    typeToken: false,
    decimal: 2,
  },
  tla: {
    name: "Lachain token",
    symbol: "TLA",
    icon: <IconTLA />,
    typeToken: false,
    decimal: 2,
  },
};

const icons = {
  eth: IconETH,
  dai: IconDAI,
  nars: IconNARS,
};

const Component = (props) => {
  const {
    name,
    token,
    price,
    onClick,
    active = false,
    readOnly = false,
  } = props;

  const amountToken = Number(bigNumberTokenToString(token)).toFixed(
    listTokens[name]?.decimal
  );

  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    width: "100%",

    padding: "20px",

    backgroundColor: "gray5",
    borderWidth: "1px",
    borderColor: active ? "primary" : "gray5",
    borderRadius: "8px",

    cursor: readOnly ? "default" : "pointer",

    _hover: {
      borderColor: readOnly ? "gray5" : active ? "primary" : "gray35",
    },
  };

  return (
    <Box
      {...style}
      onClick={() => !readOnly && onClick(name)}
      tabIndex={readOnly ? -1 : 1}
    >
      <Flex align="center" gap={8}>
        {listTokens[name]?.icon}
        <Flex direction="column">
          <Text fontWeight="bold">{listTokens[name]?.name}</Text>
          <Text size="small">{listTokens[name]?.symbol}</Text>
        </Flex>
      </Flex>
      <Flex direction="column" align="flex-end" flex={1}>
        <Text isBold>${formatAmountNumber(Number(amountToken))}</Text>
        <Text size="small">{formatAmountNumber(Number(amountToken))}</Text>
      </Flex>
    </Box>
  );
};

export default Component;
