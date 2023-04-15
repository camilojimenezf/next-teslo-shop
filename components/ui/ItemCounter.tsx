import { Box, IconButton, Typography } from '@mui/material'
import React, { FC } from 'react'
import { RemoveCircleOutline, AddCircleOutline } from '@mui/icons-material'

interface Props {
  currentValue: number;
  maxValue: number;
  updateQuantity: (quantity: number) => void;
}

export const ItemCounter: FC<Props> = ({currentValue, maxValue, updateQuantity}) => {
  return (
    <Box display='flex' alignItems='center'>
      <IconButton disabled={currentValue <= 1} onClick={() => updateQuantity(currentValue - 1)}>
        <RemoveCircleOutline/>
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>
        {currentValue}
      </Typography>
      <IconButton disabled={currentValue === maxValue} onClick={() => updateQuantity(currentValue + 1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  )
}
