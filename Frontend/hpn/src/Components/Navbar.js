import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../Assets/Orbi.png";
import { HiOutlineBars3 } from "react-icons/hi2";
import { Box, Drawer, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current path
  const [openMenu, setOpenMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn") ;
    setIsLoggedIn(userLoggedIn);
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login page
  };

  const menuOptions = [
    { text: "Home", icon: <HomeIcon />, path: "/home" },
    { text: "About", icon: <InfoIcon />, path: "/about" },
    { text: "Contact", icon: <PhoneRoundedIcon />, path: "/contact" },
    { text: "Feedback", icon: <CommentRoundedIcon />, path: "/feedback" },
    { text: "Cart", icon: <ShoppingCartRoundedIcon />, path: "/cart" },
  ];

  return (
    <nav className="navbar">
      <div className="nav-logo-container">
        <img src={Logo} alt="Logo" className="nav-logo" />
      </div>

      {/* Desktop Navigation Links */}
      <div className="navbar-links-container">
        <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>
          Home
        </Link>
        <Link to="/about" className={location.pathname === "/about" ? "active-link" : ""}>
          About
        </Link>
        <Link to="/login" className={location.pathname === "/login" ? "active-link" : ""}>
          Login
        </Link>

        {/* Show Profile & Logout when logged in */}
        {isLoggedIn && (
          <>
            <button
              className="primary-button"
              onClick={() => navigate("/profile")}
              style={{ width: "100px", marginRight: "20px" }}
            >
              Profile
            </button>
            <button
              className="primary-button"
              onClick={handleLogout} // Log Out Action
              style={{ width: "180px", backgroundColor: "gray" }}
            >
              Log Out
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>

      {/* Drawer for Mobile Menu */}
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          {menuOptions.map((item, index) => (
            <ListItemButton
              key={index}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path} // Highlight active menu item
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
