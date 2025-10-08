// Simple database service using localStorage
const STORAGE_KEY = 'cafe_orders';

export const database = {
  // Get all orders
  getAllOrders() {
    const orders = localStorage.getItem(STORAGE_KEY);
    return orders ? JSON.parse(orders) : [];
  },

  // Save a new order
  saveOrder(order) {
    const orders = this.getAllOrders();
    const newOrder = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...order
    };
    orders.push(newOrder);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    return newOrder;
  },

  // Get order by ID
  getOrderById(id) {
    const orders = this.getAllOrders();
    return orders.find(order => order.id === id);
  },

  // Delete an order
  deleteOrder(id) {
    const orders = this.getAllOrders();
    const filteredOrders = orders.filter(order => order.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredOrders));
  },

  // Clear all orders
  clearAllOrders() {
    localStorage.removeItem(STORAGE_KEY);
  }
};
