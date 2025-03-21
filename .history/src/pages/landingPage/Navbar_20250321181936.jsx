/* Navbar.css */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #101d8a; /* Blue background */
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.img {
  margin-left: 20px;
  margin-right: 20px;
  height: 40px; /* Adjust based on your logo size */
  vertical-align: middle;
}

.navbar .logo {
  display: flex;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  font-size: 35px;
  font-weight: 600;
  color: #DEB041; /* Gold color for logo */
  letter-spacing: 2px;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
}

.nav-link {
  text-decoration: none;
  color: white;
  font-family: 'Roboto', sans-serif;
  font-size: 22px;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
  letter-spacing: 1px;
}

.nav-link:hover {
  background-color: #6A2B56; /* Purple hover effect */
}

.active {
  background-color: #DEB041; /* Gold active link color */
  color: #101d8a; /* Change text color for better contrast */
}

/* Hamburger menu button - hidden by default on desktop */
.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  cursor: pointer;
  z-index: 100;
}

.menu-toggle span {
  display: block;
  height: 3px;
  width: 100%;
  background-color: white;
  border-radius: 3px;
  transition: all 0.3s ease;
}

/* Media query for tablet and mobile screens */
@media screen and (max-width: 768px) {
  .navbar {
    padding: 15px 20px;
  }
  
  .navbar .logo {
    font-size: 28px;
  }
  
  .menu-toggle {
    display: flex; /* Show hamburger on mobile */
  }
  
  /* When menu is active, transform hamburger to X */
  .menu-active .menu-toggle span:nth-child(1) {
    transform: translateY(9px) rotate(45deg);
  }
  
  .menu-active .menu-toggle span:nth-child(2) {
    opacity: 0;
  }
  
  .menu-active .menu-toggle span:nth-child(3) {
    transform: translateY(-9px) rotate(-45deg);
  }
  
  .nav-links {
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: #101d8a;
    align-items: center;
    gap: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease;
    z-index: 99;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  /* Show menu when active */
  .menu-active .nav-links {
    max-height: 300px;
    padding: 10px 0;
  }
  
  .nav-link {
    width: 100%;
    text-align: center;
    padding: 15px 0;
    font-size: 18px;
  }
}

/* Further adjustments for very small screens */
@media screen and (max-width: 480px) {
  .navbar .logo {
    font-size: 24px;
  }
  
  .img {
    margin-left: 10px;
    margin-right: 10px;
    height: 30px; /* Smaller logo on very small screens */
  }
}