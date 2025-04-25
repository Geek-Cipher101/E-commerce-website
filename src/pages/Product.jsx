import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const navigate = useNavigate();

  const product = products.find(p => p._id === productId);

  useEffect(() => {
    if (addedToCart) {
      const timer = setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [addedToCart]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <button
          onClick={() => navigate('/collection')}
          className="px-4 py-2 bg-black text-white"
        >
          Back to Collection
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(productId, quantity);
    setAddedToCart(true);
  };

  // Handle missing properties safely
  const productImages = Array.isArray(product.image) ? product.image : [product.image];
  const productSizes = Array.isArray(product.sizes) ? product.sizes : ['S', 'M', 'L', 'XL'];
  const productDescription = product.description || 'No description available';

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="grid grid-cols-2 gap-4">
          {productImages.map((img, index) => (
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
          <p className="text-gray-500 mb-4">{productDescription}</p>
          <p className="text-xl font-bold mb-4">₹{product.price}</p>

          {/* Size Selection */}
          <div className="mb-4">
            <h3 className="font-medium mb-2">Select Size</h3>
            <div className="flex gap-2">
              {productSizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border ${
                    selectedSize === size ? 'bg-black text-white' : 'hover:bg-gray-100'
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
                className="px-2 py-1 border rounded hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-2 py-1 border rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-3 ${
              addedToCart ? 'bg-green-600' : 'bg-black'
            } text-white transition-colors`}
          >
            {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
