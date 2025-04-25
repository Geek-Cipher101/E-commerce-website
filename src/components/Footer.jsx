import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img
            src={assets.logo}
            alt="logo"
            className="w-32 mb-5"
          />
          <p className="w-full md:w-2/3 text-gray-600">
            Your one-stop shop for the best products at unbeatable prices. We are committed to
            providing quality and value to our customers.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>HOME</li>
            <li>ABOUT US</li>
            <li>DELIVERY</li>
            <li>PRIVACY</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-212-456-7890</li>
            <li>contact@forever_you.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="text-center text-medium py-5">© 2025@Forever.com - All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
