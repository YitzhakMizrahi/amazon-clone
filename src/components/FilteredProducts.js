import { useSelector } from 'react-redux';
import { selectFilteredProducts } from '../slices/basketSlice';
import Product from './Product';

function FilteredProducts() {
  const filteredProducts = useSelector(selectFilteredProducts);

  return (
    <>
      {filteredProducts && (
        <p className="mb-4 font-bold text-xl text-gray-500">
          {filteredProducts.length} Products Found
        </p>
      )}
      <div className="grid grid-flow-row-dense md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {!!filteredProducts?.length &&
          filteredProducts.map((filteredProduct) => (
            <Product
              products={filteredProduct}
              setShowCart={() => {}}
              key={filteredProduct.id}
              title={filteredProduct.name}
              {...filteredProduct}
            />
          ))}
      </div>
      {!filteredProducts?.length && (
        <p className="text-sm text-gray-400 text-center py-4">
          No Product Found :(
        </p>
      )}
    </>
  );
}

export default FilteredProducts;
