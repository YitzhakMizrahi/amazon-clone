import Image from 'next/image';
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectTotalItems } from '../slices/basketSlice';
import SideCart from './SideCart';
import { useState } from 'react';
import Currency from 'react-currency-formatter';
import Highlighter from 'react-highlight-words';

function Header({ setShowCart, showCart, products }) {
  const [session, loading] = useSession();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const selectTotalItem = useSelector(selectTotalItems);
  const router = useRouter();

  const handleSearch = (e) => {
    let input = e.target.value;
    setSearchTerm(input);
    setSearchResults(
      products?.filter((product) => product.title.includes(input))
    );
  };

  return (
    <header>
      {/* Top Nav */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push('/')}
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>

        {/* Search */}
        <div
          className={`hidden relative sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500 ${
            searchTerm && showResults && 'rounded-br-none'
          }`}
        >
          <input
            onBlur={() => setShowResults(false)}
            onFocus={() => setShowResults(true)}
            value={searchTerm}
            onChange={handleSearch}
            className={`p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none a ${
              searchTerm && showResults && 'rounded-bl-none'
            }`}
            type="text"
          />
          <SearchIcon className="h-12 p-4" />

          {searchTerm && showResults && (
            <div
              onClick={() => setShowResults(true)}
              className="absolute w-full bg-white bottom-0 z-10 rounded-b-md scrollbar-hide"
              style={{
                transform: 'translateY(100%)',
                height: 'auto',
                maxHeight: '400px',
                overflowY: 'auto',
              }}
            >
              {!!searchResults?.length ? (
                searchResults.map(({ id, title, price, category }) => (
                  <div
                    onMouseDown={() => router.push(`/products/${id}`)}
                    key={id}
                    className="p-2 rounded-md hover:bg-gray-100 border-gray-100 bg-gray-50"
                  >
                    <h5 className="font-medium text-sm text-gray-600">
                      <Highlighter
                        highlightStyle={{
                          backgroundColor: 'transparent',
                          wordBreak: 'break-word',
                        }}
                        unhighlightStyle={{
                          fontWeight: 'bold',
                          backgroundColor: 'transparent',
                          wordBreak: 'break-word',
                        }}
                        searchWords={[searchTerm]}
                        autoEscape={true}
                        textToHighlight={title}
                      />
                    </h5>
                    <p className="text-xs text-gray-400">
                      {category} <Currency quantity={price} />
                    </p>
                  </div>
                ))
              ) : (
                <>
                  {searchTerm && (
                    <p className="text-xs text-gray-400 p-2">
                      No product found
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Right */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div onClick={!session ? signIn : signOut} className="link">
            <p>{session ? `Hello, ${session.user.name}` : 'Sign In'}</p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>

          <div
            onClick={() => session && router.push('/orders')}
            className="link"
          >
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div
            onClick={() => router.push('/checkout')}
            className="relative link flex items-center"
          >
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              {selectTotalItem}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue text-white text-sm">
        <p className="items-center">
          <span className="font-bold">Disclaimer: </span>
          This is not the official Amazon Store. It is a redesign, built purely
          for educational purpose.
        </p>
      </div>
      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p
          onClick={() => router.push('/products')}
          className="link flex items-center"
        >
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
      {showCart && <SideCart setShowCart={setShowCart} />}
    </header>
  );
}

export default Header;
