import React, { useState, useEffect } from 'react';
import { database } from '../services/database';
import './OrdersDisplay.css';

const OrdersDisplay = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    try {
      const allOrders = database.getAllOrders();
      // Sort by timestamp (newest first)
      const sortedOrders = allOrders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setOrders(sortedOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        database.deleteOrder(orderId);
        loadOrders();
      } catch (error) {
        console.error('Error deleting order:', error);
        alert('Error deleting order. Please try again.');
      }
    }
  };

  const handleClearAllOrders = () => {
    if (window.confirm('Are you sure you want to clear all orders? This action cannot be undone.')) {
      try {
        database.clearAllOrders();
        setOrders([]);
      } catch (error) {
        console.error('Error clearing orders:', error);
        alert('Error clearing orders. Please try again.');
      }
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="orders-display-container">
      <div className="orders-header">
        <h2>All Orders</h2>
        <div className="orders-actions">
          <button onClick={loadOrders} className="refresh-button">
            Refresh
          </button>
          {orders.length > 0 && (
            <button onClick={handleClearAllOrders} className="clear-button">
              Clear All Orders
            </button>
          )}
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>No orders yet. Place your first order!</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>{order.customerName}</h3>
                <div className="order-actions">
                  <span className="order-total">${order.total.toFixed(2)}</span>
                  <button 
                    onClick={() => handleDeleteOrder(order.id)}
                    className="delete-button"
                    title="Delete order"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="order-details">
                <div className="order-item">
                  <strong>{order.drink}</strong> - {order.size}
                </div>
                
                {order.customizations.length > 0 && (
                  <div className="order-customizations">
                    <strong>Customizations:</strong>
                    <ul>
                      {order.customizations.map(custom => (
                        <li key={custom}>{custom}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {order.specialInstructions && (
                  <div className="order-instructions">
                    <strong>Special Instructions:</strong>
                    <p>{order.specialInstructions}</p>
                  </div>
                )}
                
                <div className="order-timestamp">
                  <small>Ordered: {formatTimestamp(order.timestamp)}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="orders-summary">
        <p>Total Orders: {orders.length}</p>
        <p>Total Revenue: ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default OrdersDisplay;
