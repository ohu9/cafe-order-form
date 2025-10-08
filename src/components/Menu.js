import React, { useState, useEffect, useRef } from 'react';
import './Menu.css';

const Menu = () => {
  const [activeSection, setActiveSection] = useState('coffee');
  const coffeeRef = useRef(null);
  const teaRef = useRef(null);
  const specialtiesRef = useRef(null);

  const scrollToSection = (sectionId) => {
    const refs = {
      coffee: coffeeRef,
      tea: teaRef,
      specialties: specialtiesRef
    };
    
    const element = refs[sectionId]?.current;
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setActiveSection(sectionId);
  };

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      const sections = [
        { id: 'coffee', ref: coffeeRef },
        { id: 'tea', ref: teaRef },
        { id: 'specialties', ref: specialtiesRef }
      ];

      for (const section of sections) {
        const element = section.ref.current;
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuData = {
    coffee: [
      {
        name: "Espresso",
        description: "Just a pure shot of espresso!",
        price: 2.50
      },
      {
        name: "Latte",
        description: "Espresso and steamed milk with your choice of syrups and toppings!",
        price: 3.50
      },
      {
        name: "Cafe Miel",
        description: "Espresso with honey, cinnamon, and steamed milk",
        price: 4.00
      },
      {
        name: "Japanese Iced Coffee",
        description: "Cold brew coffee with a smooth, rich flavor",
        price: 3.75
      }
    ],
    tea: [
      {
        name: "Matcha Latte",
        description: "Ceremonial grade matcha with steamed milk",
        price: 4.25
      },
      {
        name: "Hojicha Latte",
        description: "Roasted green tea with steamed milk",
        price: 3.75
      },
      {
        name: "London Fog Latte",
        description: "Earl Grey tea with vanilla and steamed milk",
        price: 4.00
      },
      {
        name: "Chai Latte",
        description: "Spiced black tea with steamed milk",
        price: 3.75
      }
    ],
    specialties: [
      {
        name: "Affogato",
        description: "Vanilla gelato drowned in hot espresso",
        price: 5.50
      },
      {
        name: "Cortado",
        description: "Equal parts espresso and warm milk",
        price: 3.25
      },
      {
        name: "Cold Brew Float",
        description: "Cold brew coffee with vanilla ice cream",
        price: 4.75
      },
      {
        name: "Turkish Coffee",
        description: "Traditional coffee prepared in a cezve",
        price: 4.50
      }
    ]
  };

  const MenuSection = ({ title, items, ref }) => (
    <div ref={ref} className="menu-section">
      <h2 className="section-title">{title}</h2>
      <div className="menu-grid">
        {items.map((item, index) => (
          <div key={index} className="menu-item">
            <div className="menu-item-content">
              <div className="menu-item-text">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-description">{item.description}</p>
                <span className="item-price">${item.price.toFixed(2)}</span>
              </div>
              <div className="menu-item-image">
                <div className="image-placeholder"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="menu-container">
      <div className="menu-sidebar">
        <h3 className="sidebar-title">Menu</h3>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeSection === 'coffee' ? 'active' : ''}`}
            onClick={() => scrollToSection('coffee')}
          >
            Coffee
          </button>
          <button 
            className={`nav-item ${activeSection === 'tea' ? 'active' : ''}`}
            onClick={() => scrollToSection('tea')}
          >
            Tea
          </button>
          <button 
            className={`nav-item ${activeSection === 'specialties' ? 'active' : ''}`}
            onClick={() => scrollToSection('specialties')}
          >
            Specialties
          </button>
        </nav>
      </div>

      <div className="menu-content">
        <div className="menu-header">
          <h1 className="menu-title">October Menu</h1>
          <p className="menu-intro">
            Short blurb introducing the coffee house, prayerful intent, and this month's menu. Enjoy your drink!
          </p>
        </div>

        <MenuSection 
          title="Coffee" 
          items={menuData.coffee} 
          ref={coffeeRef} 
        />
        
        <MenuSection 
          title="Tea" 
          items={menuData.tea} 
          ref={teaRef} 
        />
        
        <MenuSection 
          title="Specialties" 
          items={menuData.specialties} 
          ref={specialtiesRef} 
        />
      </div>
    </div>
  );
};

export default Menu;
