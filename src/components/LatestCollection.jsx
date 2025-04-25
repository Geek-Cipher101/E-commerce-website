import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);

  //console.log(products); // Use the variable to avoid the unused variable error
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, []);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title
          text1={'LATEST'}
          text2={'COLLECTIONS'}
        />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          We will build the admin dashboard of this eCommerce website so that admin can upload the
          project, delete the product or check all products added on the store. We will build this
          eCommerce backend project / Backend API's using Node.js and Express and all products, user
          and order data will be stored on MongoDB database.
        </p>
      </div>
      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
