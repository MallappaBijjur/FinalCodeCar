import React from 'react';
import logo from '../../auto1logo.jpg';
import './header.css';

const TopHeader = (props) => (
  <header className='header'>
    <div>
      <img
        className='header__logo'
        src={logo} alt='Auto1LOgo'
      />
    </div>
    <div className='header__nav' data-testid="header">
      <a href='#purchase' className='header__navlink'>Purchase</a>
      <a href='#myOrders' className='header__navlink'>My Orders</a>
      <a href='#Sell' className='header__navlink'>Sell</a>
    </div>
  </header>
)

export default TopHeader;
