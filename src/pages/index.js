import { getSession } from 'next-auth/client';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductFeed from '../components/ProductFeed';
import { addProducts } from '../slices/basketSlice';

export default function Home({ products }) {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    dispatch(addProducts(products));
  }, [products]);

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon</title>
      </Head>

      <Header setShowCart={setShowCart} showCart={showCart} products={products} />

      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed products={products} setShowCart={setShowCart}/>
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
