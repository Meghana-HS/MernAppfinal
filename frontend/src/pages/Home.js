import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [cart, setCart] = useState([]);
    const [sortType, setSortType] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        if (!user) navigate('/login');
        else setLoggedInUser(user);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => navigate('/login'), 1000);
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://full-stack-app-beryl.vercel.app/products', {
                headers: { 'Authorization': localStorage.getItem('token') }
            });
            const result = await response.json();
            setProducts(result);
            setFilteredProducts(result);
        } catch (err) {
            handleError(err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Search products
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    // Add to cart
    const addToCart = (product) => {
        setCart([...cart, product]);
        handleSuccess(`${product.name} added to cart`);
    };

    // Remove from cart
    const removeFromCart = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
        handleSuccess('Item removed from cart');
    };

    // Sort products
    const handleSort = (type) => {
        setSortType(type);
        let sorted = [...filteredProducts];
        if (type === 'priceAsc') sorted.sort((a, b) => a.price - b.price);
        else if (type === 'priceDesc') sorted.sort((a, b) => b.price - a.price);
        else if (type === 'nameAsc') sorted.sort((a, b) => a.name.localeCompare(b.name));
        else if (type === 'nameDesc') sorted.sort((a, b) => b.name.localeCompare(a.name));
        setFilteredProducts(sorted);
    };

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Welcome, {loggedInUser}</h1>
                <button onClick={handleLogout} style={{ padding: '5px 10px', cursor: 'pointer' }}>Logout</button>
            </header>

            <div style={{ marginTop: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ padding: '5px', width: '250px' }}
                />
                <select value={sortType} onChange={(e) => handleSort(e.target.value)} style={{ padding: '5px' }}>
                    <option value="">Sort By</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                    <option value="nameAsc">Name: A to Z</option>
                    <option value="nameDesc">Name: Z to A</option>
                </select>
            </div>

            <div
  style={{
    display: 'flex',       // horizontal layout
    flexWrap: 'wrap',      // wrap to next line if needed
    gap: '15px',           // spacing between items
    marginTop: '20px',
    marginRight:'50px',
    minWidth: '300px',
    minHeight: '500px',   
  }}
>
  {filteredProducts.length > 0 ? filteredProducts.map((item, index) => (
    <div
      key={index}
      style={{
        minWidth: '200px',    // width of each item
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '5px',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
      }}
    >
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px', marginBottom: '10px' }}
        />
      )}
      <h3>{item.name}</h3>
      <p>Price: ${item.price}</p>
      <button
        onClick={() => addToCart(item)}
        style={{ padding: '5px 10px', cursor: 'pointer' }}
      >
        Add to Cart
      </button>
    </div>
  )) : <p>No products found.</p>}
</div>


            {cart.length > 0 && (
                <div style={{ marginTop: '30px' }}>
                    <h2>Cart Items ({cart.length})</h2>
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index} style={{ marginBottom: '5px' }}>
                                {item.name} - ${item.price}
                                <button
                                    onClick={() => removeFromCart(index)}
                                    style={{ marginLeft: '10px', cursor: 'pointer', padding: '2px 5px' }}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ${totalPrice}</h3>
                </div>
            )}

            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
}

export default Home;
