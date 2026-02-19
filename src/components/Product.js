import Image from 'next/image';
import { useState } from 'react';
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import Fade from 'react-reveal/Fade';
import { addToBasket } from '../slices/basketSlice';
import { useRouter } from 'next/router';

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image, setShowCart, products }) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  const [hasPrime] = useState(Math.random() < 0.5);

  const router = useRouter();

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasPrime,
      quantity: 1,
    };
    
    // Sending the product as an action to the REDUX store... the basket slice
    dispatch(addToBasket(product));
    setShowCart(true);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <Fade bottom>
        <div className="relative flex flex-col m-5 bg-white z-30 p-10">
          <div onClick={() => router.push(`/products/${id}`)} className='cursor-pointer'>
            <p className="absolute top-2 right-2 text-xs italic text-gray-400">
              {category}
            </p>
            <Image src={image} height={200} width={200} objectFit="contain" unoptimized />
            <h4 className="my-3">{title}</h4>
            <div className="flex">
              {Array(rating)
                .fill()
                .map((_, i) => (
                  <StarIcon key={i} className="h-5 text-yellow-500" />
                ))}
            </div>
            <p className="text-xs my-2 line-clamp-2">{description}</p>
            <div className="mb-5">
              <Currency quantity={price} currency="USD" />
            </div>
            {hasPrime && (
              <div className="flex items-center space-x-2 -mt-5">
                <img
                  className="w-12"
                  src="https://links.papareact.com/fdw"
                  alt=""
                />
                <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
              </div>
            )}
          </div>
          <button onClick={addItemToBasket} className="mt-auto button">
          {added ? 'Added' : 'Add to Basket'}
          </button>
        </div>
      </Fade>
     </>
  );
}

export default Product;
