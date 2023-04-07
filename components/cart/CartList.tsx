import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { ItemCounter } from '../ui';
import { FC, useContext } from 'react';
import { CartContext } from '../../context/cart/CartContext';
import { ICartProduct } from '../../interfaces';

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

  const onChangeCartQuantityValue = (product: ICartProduct, value: number) => {
    product.quantity = value;
    updateCartQuantity(product);
  }

  const onRemoveCartProduct = (product: ICartProduct) => {
    removeCartProduct(product);
  }

  return (
    <>
      {
        cart.map((product) => (
          <Grid container spacing={2} key={product.slug + product.size} sx={{ mb: 1 }}>
            <Grid item xs={3}>
              <NextLink href={`/product/${product.slug}`} passHref legacyBehavior>
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={`/products/${product.image}`}
                      component='img'
                      sx={{ borderRadius: '5px' }}
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>
            <Grid item xs={7}>
              <Box display='flex' flexDirection='column'>
                <Typography variant='body1'>{product.title}</Typography>
                <Typography variant='body1'>Talla: <strong>{product.size}</strong></Typography>
                {
                  editable
                  ? (
                    <ItemCounter
                      currentValue={product.quantity}
                      maxValue={10}
                      updateQuantity={(value) => onChangeCartQuantityValue(product, value)}                    
                    />
                  )
                  : (
                    <Typography variant='h4'>
                      {product.quantity} {product.quantity > 1 ? 'productos' : 'producto'}
                    </Typography>
                  )
                }
              </Box>
            </Grid>
            <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
              <Typography variant='subtitle1'>{`$${product.price}`}</Typography>
              {
                editable && (
                  <Button
                    variant='text'
                    color='secondary'
                    onClick={() => onRemoveCartProduct(product)}
                  >
                    Remover
                  </Button>
                )
              }
            </Grid>
          </Grid>
        ))
      }
    </>
  )
}
