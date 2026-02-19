import Header from '../../components/Header';
import Link from 'next/link';
import Image from 'next/image';
import localProducts from '../../../products/products';
import { StarIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import Currency from 'react-currency-formatter';
import Head from 'next/head';
import Product from '../../components/Product';
import Footer from '../../components/Footer';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../../slices/basketSlice';
import QuantityCount from '../../components/QuantityCount';

function Details({ product, products }) {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { id, title, price, rating, description, category, image, hasPrime } =
    product;
  // const [activeImage, setActiveImage] = useState(
  //   images[0].thumbnails.large.url
  // );

  const addItemToBasket = () => {
    dispatch(addToBasket({ ...product, quantity }));
    setShowCart(true);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <Head>
        <title>{title} | Amazon</title>
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
          /{' '}
          <span className="font-medium">
            <Link href="/products">Products</Link>
          </span>{' '}
          / <span className="text-yellow-500 cursor-pointer">{title}</span>
        </div>
      </div>
      <main className="max-w-screen-xl mx-auto mt-5">
        <div className="flex flex-wrap">
          <div className="px-5 mb-7 w-full md:w-7/12">
            <div className="w-full mb-4">
              <Image
                className={
                  'w-full rounded-lg transition-all transform hover:scale-125 duration-300'
                }
                width={700}
                height={500}
                objectFit="cover"
                src={image}
                alt=""
              />
            </div>
            <div className="flex items-center">
              {image && (
                <div className="mr-3 mb-3 cursor-pointer" key={image.id}>
                  <Image
                    className="rounded-md"
                    width={100}
                    height={100}
                    objectFit="cover"
                    src={image}
                    alt=""
                  />
                </div>
              )}
            </div>
          </div>
          <div className="px-5 mb-10 w-full md:w-5/12">
            <p className="font-serif text-xl text-black">{category}</p>
            <h1 className="my-2 text-5xl text-yellow-500 mb-7">{title}</h1>
            <p className="text-gray-600 text-base mb-5">{description}</p>
            <p className="flex items-center">
              <b className="mr-1">Rating:</b>
              {Array(rating)
                .fill()
                .map((_, i) => (
                  <StarIcon key={i} className="h-5 text-yellow-500" />
                ))}
            </p>
            <p>
              <b>Brand:</b> {}
            </p>
            <p>
              <b>Stock:</b> {1 > 0 ? 'Available in stock' : 'Stock out!'}
            </p>

            <div className="flex items-center my-4 cursor-pointer">
              {/* {colors &&
                colors.map((color) => (
                  <div
                    key={Math.random()}
                    className={`w-7 h-7 border-gray-200 border-4 rounded-full mx-1`}
                    style={{ background: color }}
                  />
                ))} */}
            </div>
            <p className="text-yellow-500 text-2xl mb-7">
              <Currency quantity={price} />
            </p>
            {hasPrime && (
              <div className="flex items-center space-x-2">
                <img
                  className="w-12"
                  src="https://links.papareact.com/fdw"
                  alt=""
                />
                <p className="text-xs text-gray-500">Free Next-day delivery</p>
              </div>
            )}
            <QuantityCount setQuantity={setQuantity} quantity={quantity} />
            <button
              onClick={addItemToBasket}
              disabled={!quantity}
              className={`w-full button mt-4 ${
                !quantity &&
                'cursor-not-allowed from-gray-300 to-gray-500 border-gray-200 focus:ring-gray-200 text-gray-300'
              }`}
            >
              {added ? 'Added' : 'Add to Basket'}
            </button>
          </div>
        </div>
      </main>
      <div className="mt-12 bg-gradient-to-t from-gray-100 to-transparent">
        <div className="max-w-screen-2xl mx-auto">
          <h1 className="text-yellow-500 text-3xl mb-7">Related Products</h1>
          <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products &&
              products
                .slice(0, 4)
                .map(
                  ({
                    id,
                    name,
                    price,
                    description,
                    category,
                    image,
                    shipping,
                    colors,
                  }) => (
                    <Product
                      products={products}
                      setShowCart={setShowCart}
                      key={id}
                      id={id}
                      name={name}
                      title={name}
                      shipping={shipping}
                      price={price}
                      description={description}
                      category={category}
                      image={image}
                      colors={colors}
                    />
                  )
                )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Details;

export const getStaticPaths = async () => {
  const paths = localProducts.map((product) => ({
    params: { id: product.id.toString() },
  }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps = async (ctx) => {
  const id = Number(ctx.params.id);
  let product = localProducts.find((p) => p.id === id) || null;
  let products = localProducts;

  try {
    const [productRes, productsRes] = await Promise.all([
      fetch(`https://fakestoreapi.com/products/${id}`),
      fetch('https://fakestoreapi.com/products'),
    ]);
    if (productRes.ok) product = await productRes.json();
    if (productsRes.ok) products = await productsRes.json();
  } catch (e) {
    // API unreachable — use local product data as fallback
  }

  if (!product) return { notFound: true };
  return { props: { product, products }, revalidate: 3600 };
};
