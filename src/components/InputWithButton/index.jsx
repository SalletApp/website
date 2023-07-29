import { Box, useToast } from '@chakra-ui/react';
import { ethers } from 'ethers';

import Button from 'src/components/Shared/Button';
import Input from 'src/components/Shared/Input';

import useTruncatedAddress from 'src/hooks/useTruncatedAddress';
import useKeyPress from 'src/hooks/useKeyPress';

const Component = (props) => {
  const { placeholder, value, onChange, onClick, addressIsValid, setAddressIsValid } = props;

  // Chakra
  const toast = useToast();

  // Hooks
  const deletePress = useKeyPress('Backspace');

  const handlePasteAddress = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const isValid = ethers.utils.isAddress(text);
      setAddressIsValid(isValid);

      if (isValid) {
        onClick(text);
        toast({
          title: 'Perfecto',
          description: 'La dirección de esta billetera es correcta',
          status: 'success',
          position: 'top',
          duration: '2000',
          isClosable: true,
        });
      } else {
        toast({
          description: 'La address parece ser incorrecta.',
          status: 'warning',
          title: 'Error',
          description: 'La dirección de esta billetera es incorrecta o inválida',
          status: 'error',
          position: 'top',
          duration: '2000',
          isClosable: true,
        });
      }
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  const handleValidateAddress = ({ target: { value } }) => {
    if (deletePress) {
      onChange('');
      return;
    }

    const isValid = ethers.utils.isAddress(value);
    setAddressIsValid(isValid);
    onChange(value);
  };

  const truncated = addressIsValid && value !== null && value !== '';
  const inputValue = truncated ? useTruncatedAddress(value) : value;

  const style = {
    position: 'relative',
    display: 'flex',
    width: '100%',
  };

  const buttonBoxStyle = {
    position: 'absolute',
    zIndex: 1,
    right: '20px',
    top: 0,

    display: 'flex',
    height: '100%',
    alignItems: 'center',
  };

  const inputStyle = {
    paddingRight: '90px',
  };

  return (
    <Box {...style}>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={handleValidateAddress}
        autoFocus={!value}
        {...inputStyle}
      />
      <Box {...buttonBoxStyle}>
        <Button size='small' type='bezeled' onClick={handlePasteAddress} isDisabled={value}>
          Pegar
        </Button>
      </Box>
    </Box>
  );
};

export default Component;
