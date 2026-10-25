

import React from 'react';

interface NavigationDotsProps {
  active: string; 
}

const NavigationDots: React.FC<NavigationDotsProps> = ({ active }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className="app__navigation" aria-label="Section navigation">
      {['home', 'about', 'work', 'skills', 'testimonial', 'contact'].map((item) => (
        <a
          href={`#${item}`}
          key={item}
          onClick={(e) => handleClick(e, item)}
          className="app__navigation-dot"
          style={active === item ? { backgroundColor: '#313BAC' } : {}}
          aria-label={`Scroll to ${item} section`}
          aria-current={active === item ? 'true' : undefined}
        />
      ))}
    </nav>
  );
};

export default NavigationDots;
