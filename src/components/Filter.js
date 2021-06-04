import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateFilters,
  clearFilters,
  selectProducts,
} from '../slices/basketSlice';
import { getUniqueValues } from '../../utils/helpers';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

function Filter() {
  const dispatch = useDispatch();
  const all_products = useSelector(selectProducts);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeCompany, setActiveCompany] = useState('all');
  // const [activeColor, setActiveColor] = useState('all');
  const [lastChange, setLastChange] = useState(null);
  const [showClear, setShowClear] = useState(false);
  const [price, setPrice] = useState(0);
  const [priceMax, setPriceMax] = useState(1);

  const categories = all_products
    ? getUniqueValues(all_products, 'category')
    : null;
  const brands = all_products ? getUniqueValues(all_products, 'company') : null;
  //   const colors = all_products ? getUniqueValues(all_products, 'colors') : null;

  const filterCategory = (value, item) => {
    setShowClear(true);
    if (item === 'category') {
      setActiveCategory(value);
      setLastChange('category');
    }
    if (item === 'company') {
      setActiveCompany(value);
      setLastChange('company');
    }
    // if (item === 'colors') {
    //   setActiveColor(value);
    //   // setLastChange('colors')
    //   const filtered =
    //     value !== 'all'
    //       ? all_products.filter((product) => product[item].includes(value))
    //       : all_products;
    //   dispatch(updateFilters(filtered));
    // }
  };

  useEffect(() => {
    const items = ['category', 'company'];
    const activeFilter = {
      category: activeCategory,
      company: activeCompany,
    };
    // const items = ['category', 'company', 'colors']
    if (all_products) {
      let filtered = all_products;

      if (activeFilter[lastChange] !== 'all') {
        filtered = all_products.filter(
          (product) => product[lastChange] === activeFilter[lastChange]
        );
      } else {
        items.forEach((f) => {
          filtered =
            f == lastChange && activeFilter[f] !== 'all'
              ? filtered.filter((product) => product[f] === activeFilter[f])
              : filtered;
        });
      }

      items.forEach((f) => {
        if (activeFilter[f] !== 'all') {
          filtered =
            f !== lastChange
              ? filtered.filter((product) => product[f] === activeFilter[f])
              : filtered;
        }
      });
      dispatch(updateFilters(filtered));
    }
  }, [activeCategory, activeCompany, lastChange]);

  useEffect(() => {
    if (!all_products) return false;
    const max = all_products
      ?.map((product) => product.price)
      .reduce((a, b) => Math.max(a, b));
    setPriceMax(max);
    setPrice(max);
  }, [all_products]);

  const clearAllFilters = () => {
    dispatch(clearFilters());
    setShowClear(false);
    setActiveCategory('all');
    setActiveCompany('all');
    // setActiveColor('all');
    setPrice(priceMax);
  };

  const priceFilter = (value) => {
    setPrice(value);
    const filtered = all_products.filter((product) => product.price <= value);
    dispatch(updateFilters(filtered));
    setShowClear(true);
  };

  return (
    <div className="flex flex-col mt-10">
      <div className="mb-4">
        <h2 className="font-bold text-base text-gray-600">Categories</h2>
        <div className="flex flex-col my-5">
          {categories &&
            categories.map((category) => (
              <p
                key={category}
                className={`${
                  category == activeCategory &&
                  'border-b border-[#ddd] w-fit_content'
                } text-gray-500 cursor-pointer mb-2`}
                onClick={() => filterCategory(category, 'category')}
              >
                {category}
              </p>
            ))}
        </div>
      </div>
      <div className="mb-4">
        <h2 className="font-bold text-base text-gray-600">Brands</h2>
        <div className="flex flex-col my-5">
          {brands &&
            brands.map((brand) => (
              <p
                key={brand}
                className={`${
                  brand == activeCompany &&
                  'border-b border-[#ddd] w-fit_content'
                } text-gray-500 cursor-pointer mb-2`}
                onClick={() => filterCategory(brand, 'company')}
              >
                {brand}
              </p>
            ))}
        </div>
      </div>
      <div className="mb-4 pr-10">
        <h2 className="font-bold text-base text-gray-600">Price</h2>
        <div className="flex flex-col my-5">
          <InputRange
            maxValue={priceMax}
            minValue={0}
            value={price}
            formatLabel={(value) => `$ ${value}`}
            onChange={priceFilter}
          />
        </div>
      </div>
      {/* <div className="mb-4">
                <h2 className="font-bold text-base text-gray-600">
                    Colors
                </h2>
                <div className="flex justify-between my-5">
                    {colors && colors.map(value => (
                        <div onClick={() => filterCategory(value, 'colors')} key={value} className={`w-7 h-7 cursor-pointer border-4  shadow-sm ${value == activeColor ? 'border-white' : 'border-gray-200'} rounded-full mx-1`} style={{ background: value }}/>
                    ))}
                </div>
            </div> */}

      {showClear && (
        <button onClick={clearAllFilters} className="button w-full">
          Clear Filter
        </button>
      )}
    </div>
  );
}

export default Filter;
