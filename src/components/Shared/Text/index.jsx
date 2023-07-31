import { Text } from '@chakra-ui/react';

const Component = (props) => {
  const { children, size = 'medium', opacity = 100, isBold = false, align = 'left' } = props;

  const variants = {
    small: {
      fontSize: '14px',
      lineHeight: '20px',
    },
    medium: {
      fontSize: '16px',
      lineHeight: '22px',
    },
    large: {
      fontSize: '18px',
      lineHeight: '24px',
    },
  };

  const style = {
    opacity,

    margin: 0,

    color: 'text',
    fontWeight: isBold ? 700 : 400,
    textAlign: align,
  };

  return (
    <Text {...style} {...variants[size]} {...props}>
      {children}
    </Text>
  );
};

export default Component;
