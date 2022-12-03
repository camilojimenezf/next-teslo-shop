import { FC } from 'react';
import React from 'react'
import { ISize } from '../../interfaces';
import { Box, Button } from '@mui/material';

interface Props {
  selectedSize?: ISize;
  sizes: ISize[];
}

export const SizeSelector: FC<Props> = ({ selectedSize, sizes }) => {
  console.log('selectedSize', selectedSize);
  console.log('sizes', sizes);
  return (
    <Box>
      {
        sizes.map((size) => (
          <Button
            key={size}
            size='small'
            color={selectedSize === size ? 'secondary' : 'info'}
          >
            {size}
          </Button>
        ))
      }
    </Box>
  )
}
