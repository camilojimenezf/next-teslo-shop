import { Box, Typography } from '@mui/material';
import { NextPage } from 'next';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout title={'Teslo-Shop - SearchPage'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>
      <Typography variant='h1' component='h1'>Buscar producto</Typography>
      {
        foundProducts
          ? <Typography variant='h2' sx={{ mb: 1 }}>Término: { query }</Typography>
          : (
            <Box display='flex'>
              <Typography variant='h2' sx={{ mb: 1 }}>No encontramos ningún producto</Typography>
              <Typography variant='h2' sx={{ ml: 1 }} color="secondary">{ query }</Typography>
            </Box>
          )
      }
      <ProductList products={products} />
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next'
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces/product';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      }
    }
  }

  let products = await dbProducts.getProductsByTerm(query);
  const foundProducts = products.length > 0;

  if (!foundProducts) {
    products = await dbProducts.getAllProducts();
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    }
  }
}

export default SearchPage;
