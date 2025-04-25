import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p._id === productId);

  if (!product) {
    return <div className="text-center py-8">Product not found</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(productId, quantity);
  };

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="grid grid-cols-2 gap-4">
          {product.image.map((img, index) => (
            <img 
              key={index} 
              src={img} 
              alt={`${product.name} ${index + 1}`} 
              className="w-full h-64 object-cover"
            />
          ))}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-500 mb-4">{product.description}</p>
          <p className="text-xl font-bold mb-4">₹{product.price}</p>

          {/* Size Selection */}
          <div className="mb-4">
            <h3 className="font-medium mb-2">Select Size</h3>
            <div className="flex gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border ${
                    selectedSize === size ? 'bg-black text-white' : ''
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Quantity</h3>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-2 py-1 border rounded"
              >
                -
              </button>
              <span>{quantity}</span>
              <button 
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-2 py-1 border rounded"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-3"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;