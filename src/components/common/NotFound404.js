import React, { Fragment } from 'react'
import auto1logo from '../../auto1logo.jpg';
import TopHeader from './TopHeader';
import Footer from './Footer';
import './error.css';

const NotFound404 = () => (
  <Fragment>
    <TopHeader />
    <div className='error__container'>
      <div className='error'>
        <img
          className='logo'
          src={auto1logo} alt='Auto1'
        />
        <h2 className='error__text--dark error__text-large'>
      404 - Not Found
        </h2>
        <p
          className='error__text--medium error__text--dark'
        >Sorry, the page you are looking for does not exist.</p>
        <p
          className='error__text--medium'
        >
    You can always go back to the
          <a
            className='error__link' href='/'
          > homepage</a>
        </p>
      </div>
    </div>
    <Footer />
  </Fragment>
)

export default NotFound404;
