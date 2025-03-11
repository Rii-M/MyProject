import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ esetShowLogin }) => {
  const [activeSection, setActiveSection] = useState('');
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  // Function to handle smooth scrolling or navigation to home page first
  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault();
    
    if (location.pathname !== '/') {
      // Redirect to home with a query parameter to scroll after navigation
      navigate(`/?scrollTo=${sectionId}`);
    } else {
      // Scroll to section if already on home page
      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 80, // Adjust for navbar height
          behavior: 'smooth',
        });
      }
    }
  };

  // Handle scrolling after navigating from another page
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sectionId = params.get('scrollTo');

    if (sectionId) {
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth',
          });
        }
      }, 100); // Small delay to ensure the section is rendered
    }
  }, [location]);

  // Function to update the active section on scroll
  useEffect(() => {
    const sections = ['explore-menu', 'app-download', 'footer'];
    
    const handleScroll = () => {
      let closestSection = 'home'; // Default to home if no section is in view
      let minDistance = window.innerHeight; 

      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          const distance = Math.abs(rect.top);

          if (distance < minDistance && rect.top <= window.innerHeight / 2) {
            minDistance = distance;
            closestSection = sectionId;
          }
        }
      });

      setActiveSection(closestSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logos" />
      </Link>
      <ul className="navbar-menu">
        <a href="#home" onClick={(e) => handleScrollToSection(e, 'home')} className={activeSection === 'home' ? 'active' : ''}>
          home
        </a>
        <a href="#explore-menu" onClick={(e) => handleScrollToSection(e, 'explore-menu')} className={activeSection === 'explore-menu' ? 'active' : ''}>
          menu
        </a>
        <a href="#app-download" onClick={(e) => handleScrollToSection(e, 'app-download')} className={activeSection === 'app-download' ? 'active' : ''}>
          mobile-app
        </a>
        <a href="#footer" onClick={(e) => handleScrollToSection(e, 'footer')} className={activeSection === 'footer' ? 'active' : ''}>
          contact-us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
        </div>
        {!token ? (
          <button onClick={() => esetShowLogin(true)}>Log In</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Log out</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
