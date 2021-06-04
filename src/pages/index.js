import { getSession } from 'next-auth/client';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductFeed from '../components/ProductFeed';
import { addProducts, restoreBasket } from '../slices/basketSlice';

const MAX_RATING = 5;
const MIN_RATING = 1;

export default function Home({ products }) {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);

  const modifiedProducts = products.map((prod) => ({
    ...prod,
    rating:
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING,
    hasPrime: Math.random() < 0.5,
  }));

  useEffect(() => {
    dispatch(addProducts(modifiedProducts));
  }, [products]);

  useEffect(() => {
    const localBasket = localStorage.getItem('basket');
    if (localBasket) {
      dispatch(restoreBasket(JSON.parse(localBasket)));
    }
  }, []);

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon</title>
      </Head>

      <Header
        setShowCart={setShowCart}
        showCart={showCart}
        products={products}
      />

      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed products={products} setShowCart={setShowCart} />
      </main>

      <Footer />
    </div>
  );
}

// GET >>> https://fakestoreapi.com/products
export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  const products = await fetch('https://fakestoreapi.com/products').then(
    (res) => res.json()
  );

  return {
    props: {
      session,
      products,
    },
  };
};
