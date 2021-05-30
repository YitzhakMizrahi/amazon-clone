import { getSession } from 'next-auth/client';
import Head from 'next/head';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductFeed from '../components/ProductFeed';

export default function Home({ products }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon</title>
      </Head>

      <Header />

      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed products={products} />
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
