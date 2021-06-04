import Image from 'next/image';
import { useSession } from 'next-auth/client';
import { useDispatch, useSelector } from 'react-redux';
import Currency from 'react-currency-formatter';
import {
  clearBasket,
  restoreBasket,
  selectItems,
  selectTotal,
  selectTotalItems,
} from '../slices/basketSlice';
import CheckoutProduct from '../components/CheckoutProduct';
import Header from '../components/Header';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';
const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const selectTotalItem = useSelector(selectTotalItems);
  const [session] = useSession();

  useEffect(() => {
    const localBasket = localStorage.getItem('basket');
    if (localBasket) {
      dispatch(restoreBasket(JSON.parse(localBasket)));
    }
  }, []);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    // Call the backend to create a checkout session..
    const checkoutSession = await axios.post('/api/create-checkout-session', {
      items: items,
      email: session.user.email,
    });
    dispatch(clearBasket());

    // Redirect user/customer to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) alert(result.error.message);
  };

  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? 'Your Amazon Basket is empty'
                : 'Shopping Basket'}
            </h1>

            {items.map((item, i) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>

        {/* Right */}
        {items.length > 0 && (
          <div className="flex flex-col bg-white p-10 shadow-md">
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({selectTotalItem} items):{' '}
                <span className="font-bold">
                  <Currency quantity={total} currency="USD" />
                </span>
              </h2>

              <button
                role="link"
                onClick={createCheckoutSession}
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'
                }`}
              >
                {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
              </button>
            </>
          </div>
        )}
      </main>
    </div>
  );
}

export default Checkout;
