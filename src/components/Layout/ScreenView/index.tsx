import { Flex } from '@chakra-ui/react';

const Component = (props) => {
  return (
    <Flex 
      {...props}
      width={'100%'} 
      height={'100%'} 
      flexDirection={'column'} 
      />
  );
};

export default Component;
