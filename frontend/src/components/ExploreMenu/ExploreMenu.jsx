import React, { useContext, useEffect, useRef } from 'react';
import './ExploreMenu.css';
import { StoreContext } from '../../Context/StoreContext';

const ExploreMenu = ({ category, setCategory }) => {
  const { menu_list } = useContext(StoreContext);
  const foodSectionRef = useRef(null);

  // Scroll to the food section whenever the category changes
  useEffect(() => {
    if (category !== "All" && foodSectionRef.current) {
      foodSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [category]);

  return (
    <div className='explore-menu' id='explore-menu'>
      <center>
        <h1>Our Category</h1>
      </center>
      <div className="explore-menu-grid">
        {menu_list.length > 0 ? (
          menu_list.map((item, index) => (
            <div
              key={index}
              onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
              className={`explore-menu-grid-item ${category === item.menu_name ? 'active' : ''}`}
            >
              <img src={item.menu_image} alt={item.menu_name} />
              <p>{item.menu_name}</p>
            </div>
          ))
        ) : (
          <p>No items available</p>
        )}
      </div>

      {/* Dishes Section - Scrolls here when a category is clicked */}
      <div ref={foodSectionRef} className='food-display-section'>
        {/* Here you can render the dishes for the selected category */}
        <center>
        <h2>{category === 'All' ? 'All Dishes' : `${category} Crackers`}</h2>
        </center>
        {/* Add your code to display the dishes based on the selected category */}
      </div>
    </div>
  );
};

export default ExploreMenu;