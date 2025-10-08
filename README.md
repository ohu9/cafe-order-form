# Cafe Order Form

A React-based order management system for Common Ground Cafe with drink customization options and order tracking.

## Features

- **Order Form**: Interactive form for placing drink orders with:
  - Customer name input
  - Drink selection (Coffee, Latte, Cappuccino, Americano, Mocha, Frappuccino)
  - Size options (Small, Medium, Large)
  - Customization options (milk types, extra shots, temperature, etc.)
  - Special instructions
  - Real-time price calculation

- **Order Management**: 
  - View all placed orders
  - Order details with customizations
  - Delete individual orders
  - Clear all orders
  - Order summary with total revenue

- **Data Persistence**: Orders are stored in browser localStorage

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. **Place an Order**: 
   - Navigate to the "Place Order" tab
   - Fill in customer name
   - Select a drink and size
   - Choose customizations
   - Add special instructions if needed
   - Click "Place Order"

2. **View Orders**:
   - Navigate to the "View Orders" tab
   - See all placed orders with details
   - Delete individual orders or clear all
   - View order summary and total revenue

## Technologies Used

- React 18
- React Router DOM
- CSS3 for styling
- localStorage for data persistence

## Project Structure

```
src/
├── components/
│   ├── OrderForm.js          # Main order form component
│   ├── OrderForm.css         # Order form styles
│   ├── OrdersDisplay.js      # Orders display component
│   └── OrdersDisplay.css     # Orders display styles
├── data/
│   └── drinks.js             # Drink menu data
├── services/
│   └── database.js           # Database service (localStorage)
├── App.js                    # Main app component with routing
├── App.css                   # Main app styles
└── index.js                  # App entry point
```