import React, { useEffect, useState } from 'react';
import { Col, Container, Nav, Navbar, NavbarBrand, NavItem, NavLink, Row } from 'reactstrap';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Cart from './components/Cart.js';
import CategoryList from './components/CategoryList.js';
import ProductList from './components/ProductList.js';
import './App.css';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    };

    const fetchCategories = async () => {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();

      const formattedCategories = data.map((category, index) => ({
        id: index + 1,
        name: category,
      }));
      setCategories(formattedCategories);
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleAddToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (product) => {
    setCart(cart.filter(item => item.id !== product.id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category === selectedCategory.name) 
    : products;

  return (
    <Router>
      <Container>
        <Navbar color="light" expand="md">
        <NavbarBrand id='eticaret' tag={Link} to="/" onClick={() => setSelectedCategory(null)}>E-Ticaret</NavbarBrand>
          <Nav className='mr-auto' navbar>
            <NavItem>
              <NavLink tag={Link} to="/cart">Sepet ({cart.length})</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <Routes>
          <Route
            path='/'
            element={
              <Row>
                <Col sm="3">
                  <CategoryList categories={categories} onSelectedCategory={setSelectedCategory} />
                </Col>
                <Col sm="8">
                  <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
                </Col>
              </Row>
            }
          />
          <Route
            path='/cart'
            element={
              <Cart cartItems={cart} onRemoveFromCart={handleRemoveFromCart} onClearCart={handleClearCart} />
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
