import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import OrderForm from './components/OrderForm';
import OrdersDisplay from './components/OrdersDisplay';
import Menu from './components/Menu';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="header-content">
            <button className="hamburger-menu" onClick={toggleSidebar}>
              <span></span>
              <span></span>
              <span></span>
            </button>
            <h1>Common Ground Cafe - Order System</h1>
          </div>
        </header>

        <div className="app-layout">
          <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
            <nav className="sidebar-nav">
              <Link 
                to="/" 
                className="nav-link" 
                onClick={closeSidebar}
              >
                📋 Menu
              </Link>
              <Link 
                to="/order" 
                className="nav-link" 
                onClick={closeSidebar}
              >
                📝 Place Order
              </Link>
              <Link 
                to="/orders" 
                className="nav-link" 
                onClick={closeSidebar}
              >
                📊 View Orders
              </Link>
            </nav>
          </aside>

          <div className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`} onClick={closeSidebar}></div>
          
          <main className="main-content">
            <Routes>
              <Route 
                path="/" 
                element={<Menu />} 
              />
              <Route 
                path="/order" 
                element={<OrderForm />} 
              />
              <Route 
                path="/orders" 
                element={<OrdersDisplay />} 
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
