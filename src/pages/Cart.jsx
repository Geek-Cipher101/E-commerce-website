import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const Cart = () => {
  const { cartItems, products, removeFromCart, updateCartItemQuantity, getCartTotal, currency } = useContext(ShopContext);

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {cartItems.map(item => {
              const product = products.find(p => p._id === item.id);
              if (!product) return null;
              
              return (
                <div key={item.id} className="flex items-center gap-4 border-b py-4">
                  <img src={product.image[0]} alt={product.name} className="w-24 h-24 object-cover" />
                  <div className="flex-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-gray-500">{currency}{product.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button 
                        onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 border rounded"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 border rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="font-medium">{currency}{product.price * item.quantity}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="border p-4 h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{currency}{getCartTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{currency}50</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{currency}{getCartTotal() + 50}</span>
                </div>
              </div>
            </div>
            <button className="w-full bg-black text-white py-2 mt-4">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;