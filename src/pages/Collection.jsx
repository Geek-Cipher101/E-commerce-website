import React, { useContext, useEffect, useState, useMemo } from "react";
import PropTypes from 'prop-types';
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Memoize filtered products to prevent unnecessary recalculations
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    return products.filter((item) => {
      const matchesCategory = category.length === 0 || category.includes(item.category);
      const matchesSubCategory = subCategory.length === 0 || subCategory.includes(item.subCategory);
      return matchesCategory && matchesSubCategory;
    });
  }, [products, category, subCategory]);

  // Memoize sorted products
  const sortedProducts = useMemo(() => {
    const productsToSort = [...filteredProducts];
    
    switch(sortType) {
      case "low-high":
        return [...productsToSort].sort((a, b) => a.price - b.price);
      case "high-low":
        return [...productsToSort].sort((a, b) => b.price - a.price);
      default:
        return productsToSort;
    }
  }, [filteredProducts, sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            alt="Filter dropdown"
          />
        </p>
        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="text-sm font-medium mb-3">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {['Men', 'Women', 'Kids'].map((cat) => (
              <label key={cat} className="flex gap-2 cursor-pointer">
                <input
                  onChange={toggleCategory}
                  className="w-3"
                  type="checkbox"
                  value={cat}
                  checked={category.includes(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>
        {/* Subcategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="text-sm font-medium mb-3">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {['Topwear', 'Bottomwear', 'Winterwear'].map((type) => (
              <label key={type} className="flex gap-2 cursor-pointer">
                <input
                  onChange={toggleSubCategory}
                  className="w-3"
                  type="checkbox"
                  value={type}
                  checked={subCategory.includes(type)}
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select 
            onChange={(e) => setSortType(e.target.value)} 
            value={sortType}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((item) => (
              <ProductItem
                key={item._id}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              No products found matching your filters
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Add prop types for better type safety
Collection.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      subCategory: PropTypes.string.isRequired,
    })
  ),
};

export default Collection;