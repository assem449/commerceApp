import React, { useState } from 'react';
import { Navbar, Nav, Badge } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/commerce.png';
import useStyles from './styles';

const PrimarySearchAppBar = ({ totalItems }) => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const classes = useStyles();
  const location = useLocation();

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const renderMobileMenu = (
    <Nav className="ml-auto">
      <Nav.Link as={Link} to="/cart">
        <Badge pill variant="secondary" className="mr-2">{totalItems}</Badge>
        Cart
      </Nav.Link>
    </Nav>
  );

  return (
    <>
      <Navbar bg="light" expand="lg" className={classes.appBar} fixed="top">
        <Navbar.Brand as={Link} to="/" className={classes.title}>
          <img src={logo} alt="commerce.js" height="25px" className={classes.image} /> Commerce.js
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" />
          {location.pathname === '/' && (
            <Nav className="mr-2">
              <Nav.Link as={Link} to="/cart">
                <Badge pill variant="secondary" className="mr-2">{totalItems}</Badge>
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
      {renderMobileMenu}
    </>
  );
};

export default PrimarySearchAppBar;
