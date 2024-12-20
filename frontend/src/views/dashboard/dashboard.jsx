import React, { useEffect, useState } from 'react';
import './dashboard.css';
function dashboard() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    // Fetch products
    fetch('http://localhost:5500/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => setError(error.message));

    // Fetch users
    fetch('http://localhost:5500/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((error) => setError(error.message));
  }, []);

  const handleOpenModal = (type) => {
    setDialogType(type);
    setIsModalOpen(true);
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      email: '',
      password: '',
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDialogType(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const url =
        dialogType === 'product'
          ? 'http://localhost:5500/products'
          : 'http://localhost:5500/users';

      const payload =
        dialogType === 'product'
          ? {
            name: formData.name,
            description: formData.description,
            price: Number(formData.price),
            stock: Number(formData.stock),
          }
          : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to add entry');
      }

      const newEntry = await response.json();

      if (dialogType === 'product') {
        setProducts((prev) => [...prev, newEntry]);
      } else {
        setUsers((prev) => [...prev, newEntry]);
      }

      handleCloseModal();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Dashboard Admin E-commerce Web site</h1>
      {error && <p className="error">Error: {error}</p>}
      <div className="list-container">
        <div className="products">
          <h2>Products</h2>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <span>{product.name}</span> - <span>${product.price}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="users">
          <h2>Users</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <span>{user.name}</span> - <span>{user.email}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="actions">
        <button onClick={() => handleOpenModal('product')} className="btn primary">
          Add Product
        </button>
        <button onClick={() => handleOpenModal('user')} className="btn secondary">
          Add User
        </button>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{dialogType === 'product' ? 'Add Product' : 'Add User'}</h2>
            <form>
              {dialogType === 'product' ? (
                <>
                  <label>
                    Product Name:
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Product Description:
                    <input
                      type='text'
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Product Price:
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Stock Quantity:
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                    />
                  </label>
                </>
              ) : (
                <>
                  <label>
                    User Name:
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Email :
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Password:
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </label>
                </>
              )}
            </form>
            <div className="modal-actions">
              <button onClick={handleCloseModal} className="btn">
                Cancel
              </button>
              <button onClick={handleSubmit} className="btn primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default dashboard;
