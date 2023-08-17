import { Box, Button } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import QR from "src/components/Icons/QR";

interface QrButtonProps {
  brand?: string;
  onClick?: () => void;
}

const Component: FunctionComponent<QrButtonProps> = (props) => {
  const { brand = "primary", onClick } = props;

  const boxStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",

    p: {
      color: "gray35",
    },
  };

  const buttonStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 75,
    minWidth: 75,

    backgroundColor: brand,
    borderRadius: 999,

    _hover: {
      opacity: 0.85,
      backgroundColor: brand,
    },
    _active: {
      opacity: 0.65,
      backgroundColor: brand,
    },
  };

  return (
    <Box {...boxStyle}>
      <Button {...buttonStyle} {...props} onClick={onClick}>
        <Box alignItems="center">
          <QR />
        </Box>
      </Button>
    </Box>
  );
};

export default Component;
