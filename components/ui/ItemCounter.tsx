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
      <IconButton disabled={currentValue <= 1}>
        <RemoveCircleOutline
          onClick={() => updateQuantity(currentValue - 1)}
        />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>
        {currentValue}
      </Typography>
      <IconButton disabled={currentValue === maxValue}>
        <AddCircleOutline
          onClick={() => updateQuantity(currentValue + 1)}
        />
      </IconButton>
    </Box>
  )
}
