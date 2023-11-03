import React, { Component } from 'react';


const products = [
  {
    id: 1,
    title: 'Product 1',
    description: 'This is the description for Product 1.',
    price: 19.99,
    category: 'Category A',
    image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR2pNLm065a3XdN8U_CA7Lh7AEIbGAWeVi3JJcIoBa7cdupt7iJFfvW0zWlUSdz1drOV0IRSSt6nlU1L5B799KjBYtmNL-1KQMBsE555w6jus_wAJYG7iTK',
  },
  {
    id: 2,
    title: 'Product 2',
    description: 'This is the description for Product 2.',
    price: 29.99,
    category: 'Category B',
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTriY0FtcdvsMrk4c1zwedNU-9diPNaq8fjHZVHxp67AlakSOTmOSCqvK3jFNJDiSKgNWKaUZE6zmQwT3WulTbCAhaCsuTdY6ljJV6cBDJN3eOLgUOlDZpyPg',
  },
  {
    id: 3,
    title: 'Product 3',
    description: 'This is the description for Product 3.',
    price: 15.99,
    category: 'Category C',
    image: 'https://img.freepik.com/free-photo/simple-white-sweater-unisex-streetwear-apparel_53876-101504.jpg?size=626&ext=jpg',
  },

];

class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      products: products,
      categoryFilter: 'All',
      sortBy: 'price',
      page: 1,
      productsPerPage: 5,
    };
  }

  handleCategoryChange = (event) => {
    this.setState({ categoryFilter: event.target.value });
  };

  handleSortChange = (event) => {
    this.setState({ sortBy: event.target.value });
  };

  handlePageChange = (pageNumber) => {
    this.setState({ page: pageNumber });
  };

  render() {
    const { products, categoryFilter, sortBy, page, productsPerPage } = this.state;

    // Filtering products based on category
    const filteredProducts = categoryFilter === 'All'
      ? products
      : products.filter(product => product.category === categoryFilter);

    // Sorting products based on the selected sorting method
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price;
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    // Pagination logic
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = sortedProducts.slice(startIndex, endIndex);

    return (
      <div>
        <div>
          <label>
            Filter by Category:
            <select value={categoryFilter} onChange={this.handleCategoryChange}>
              <option value="All">All</option>
              <option value="Category A">Category A</option>
              <option value="Category B">Category B</option>
              <option value="Category B">Category C</option>
              
            </select>
          </label>
          <label>
            Sort by:
            <select value={sortBy} onChange={this.handleSortChange}>
              <option value="price">Price</option>
              <option value="title">Title</option>
            </select>
          </label>
        </div>
        <ul className="product-list">
          {currentProducts.map((product) => (
            <li key={product.id} className="product-item">
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price.toFixed(2)}</p>
              <p>Category: {product.category}</p>
            </li>
          ))}
        </ul>
        <div className="pagination">
          {Array.from({ length: Math.ceil(sortedProducts.length / productsPerPage) }, (_, index) => (
            <button key={index + 1} onClick={() => this.handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default ProductList;
