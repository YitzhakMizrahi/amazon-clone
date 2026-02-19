import Head from 'next/head';
import Link from 'next/link';
import localProducts from '../../../products/products';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Filter from '../../components/Filter';
import FilteredProducts from '../../components/FilteredProducts';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { addProducts, restoreBasket } from '../../slices/basketSlice';

function Products({ products }) {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    dispatch(addProducts(products));
  }, [products]);

  useEffect(() => {
    const localBasket = localStorage.getItem('basket');
    if (localBasket) {
      dispatch(restoreBasket(JSON.parse(localBasket)));
    }
  }, []);

  return (
    <>
      <Head>
        <title>All Products | Amazon</title>
      </Head>
      <Header
        products={products}
        setShowCart={setShowCart}
        showCart={showCart}
      />

      <div className="bg-gray-200 p-10 mb-10">
        <div className="max-w-screen-xl mx-auto">
          <span className="font-medium">
            <Link href="/">Home</Link>
          </span>{' '}
          / <span className="text-yellow-500 cursor-pointer">Products</span>
        </div>
      </div>

      <main className="max-w-screen-xl mx-auto mt-5">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-3/12 w-full mb-5 px-5">
            <Filter />
          </div>
          <div className="md:w-9/12 w-full mb-5 px-5">
            <FilteredProducts />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Products;

export const getStaticProps = async () => {
  let products = localProducts;
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    if (res.ok) products = await res.json();
  } catch (e) {
    // API unreachable — use local product data as fallback
  }
  return { props: { products }, revalidate: 3600 };
};
