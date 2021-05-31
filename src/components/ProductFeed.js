import Product from './Product';

function ProductFeed({ products, setShowCart }) {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52">
      {products
        .slice(0, 3)
        .map(({ id, products, title, price, description, category, image }) => (
          <Product
            key={id}
            id={id}
            products={products}
            setShowCart={setShowCart}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        ))}

      <img
        className="md:col-span-full"
        src="https://links.papareact.com/dyz"
        alt=""
      />
      <div className="md:col-span-2">
        {products
          .slice(4, 5)
          .map(
            ({ id, products, title, price, description, category, image }) => (
              <Product
                key={id}
                id={id}
                products={products}
                setShowCart={setShowCart}
                title={title}
                price={price}
                description={description}
                category={category}
                image={image}
              />
            )
          )}
      </div>
      {products
        .slice(5, products.length)
        .map(({ id, title, products, price, description, category, image }) => (
          <Product
            key={id}
            id={id}
            products={products}
            setShowCart={setShowCart}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        ))}
    </div>
  );
}

export default ProductFeed;
