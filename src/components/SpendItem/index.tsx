import { Box } from "@chakra-ui/react";

import Text from "src/components/Shared/Text";
import Flex from "src/components/Shared/Flex";

import IconDrink from "src/components/Icons/DRINK";
import IconFood from "src/components/Icons/FOOD";
import IconMerch from "src/components/Icons/MERCH";

import bigNumberTokenToString from "src/hooks/useUtils";
import formatAmountNumber from "src/lib/formatAmountNumber";
import { FunctionComponent } from "react";
import { BigNumber } from "ethers";

const listTokens = {
  drink: {
    decimal: 4,
  },
  merch: {
    decimal: 2,
  },
  food: {
    decimal: 2,
  },
  tla: {
    decimal: 2,
  },
};

const icons = {
  drink: <IconDrink />,
  food: <IconFood />,
  merch: <IconMerch />,
};

// const icons = {
//   eth: IconETH,
//   dai: IconDAI,
//   nars: IconNARS,
// };

type SpendType = "drink" | "food" | "merch";

interface SpendItemProps {
  type: SpendType;
  name: string;
  date: string;
  amount: BigNumber;
  readOnly?: boolean;
}

const Component: FunctionComponent<SpendItemProps> = (props) => {
  const { amount, date, readOnly = false, type, name } = props;

  const amountToken = Number(bigNumberTokenToString(amount)).toFixed(
    listTokens[type]?.decimal
  );

  const icon = icons[type];

  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    width: "100%",

    padding: "10px",

    backgroundColor: "transparent",
    borderRadius: "8px",

    cursor: readOnly ? "default" : "pointer",

    _hover: {
      borderColor: readOnly ? "gray5" : "gray35",
    },
  };

  return (
    <Box {...style} tabIndex={readOnly ? -1 : 1}>
      <Flex align="center" gap={8}>
        {icon}
        <Flex direction="column">
          <Text fontWeight="bold">{date}</Text>
        </Flex>
      </Flex>
      <Flex direction="row" align="center" flex={1} gap={4}>
        <Text isBold>{formatAmountNumber(Number(amountToken))}</Text>
        <Text size="small">{name}</Text>
      </Flex>
    </Box>
  );
};

export default Component;
