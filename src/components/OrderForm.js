import React, { useState } from 'react';
import { drinks } from '../data/drinks';
import { database } from '../services/database';
import './OrderForm.css';

const OrderForm = () => {
  const [selectedDrink, setSelectedDrink] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [customizations, setCustomizations] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentDrink = drinks.find(drink => drink.id === selectedDrink);

  const calculateTotal = () => {
    if (!currentDrink || !selectedSize) return 0;
    
    const sizePrice = currentDrink.sizes.find(size => size.name === selectedSize)?.price || 0;
    const customizationPrice = customizations.reduce((total, custom) => {
      const customOption = currentDrink.customizations.find(c => c.name === custom);
      return total + (customOption?.price || 0);
    }, 0);
    
    return currentDrink.basePrice + sizePrice + customizationPrice;
  };

  const handleCustomizationChange = (customization) => {
    setCustomizations(prev => 
      prev.includes(customization)
        ? prev.filter(c => c !== customization)
        : [...prev, customization]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDrink || !selectedSize || !customerName.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const order = {
        drink: currentDrink.name,
        size: selectedSize,
        customizations,
        customerName: customerName.trim(),
        specialInstructions: specialInstructions.trim(),
        total: calculateTotal()
      };

      const savedOrder = database.saveOrder(order);
      
      // Reset form
      setSelectedDrink('');
      setSelectedSize('');
      setCustomizations([]);
      setCustomerName('');
      setSpecialInstructions('');
      
      alert('Order placed successfully!');
    } catch (error) {
      alert('Error placing order. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="order-form-container">
      <h2>Place Your Order</h2>
      <form onSubmit={handleSubmit} className="order-form">
        <div className="form-group">
          <label htmlFor="customerName">Customer Name *</label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="drink">Select Drink *</label>
          <select
            id="drink"
            value={selectedDrink}
            onChange={(e) => {
              setSelectedDrink(e.target.value);
              setSelectedSize('');
              setCustomizations([]);
            }}
            required
          >
            <option value="">Choose a drink</option>
            {drinks.map(drink => (
              <option key={drink.id} value={drink.id}>
                {drink.name} - ${drink.basePrice.toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        {currentDrink && (
          <>
            <div className="form-group">
              <label>Size *</label>
              <div className="size-options">
                {currentDrink.sizes.map(size => (
                  <label key={size.name} className="size-option">
                    <input
                      type="radio"
                      name="size"
                      value={size.name}
                      checked={selectedSize === size.name}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      required
                    />
                    <span>
                      {size.name} {size.price > 0 && `(+$${size.price.toFixed(2)})`}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Customizations</label>
              <div className="customization-options">
                {currentDrink.customizations.map(custom => (
                  <label key={custom.name} className="customization-option">
                    <input
                      type="checkbox"
                      checked={customizations.includes(custom.name)}
                      onChange={() => handleCustomizationChange(custom.name)}
                    />
                    <span>
                      {custom.name} {custom.price > 0 && `(+$${custom.price.toFixed(2)})`}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="form-group">
          <label htmlFor="specialInstructions">Special Instructions</label>
          <textarea
            id="specialInstructions"
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder="Any special requests or notes..."
            rows="3"
          />
        </div>

        {selectedDrink && selectedSize && (
          <div className="total-section">
            <h3>Total: ${calculateTotal().toFixed(2)}</h3>
          </div>
        )}

        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting || !selectedDrink || !selectedSize || !customerName.trim()}
        >
          {isSubmitting ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
