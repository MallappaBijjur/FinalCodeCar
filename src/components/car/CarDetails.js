import React, { useState, useEffect } from 'react';
import '../home-car.css';
import TopHeader from '../common/TopHeader';
import Footer from '../common/Footer';
import Button from 'react-bootstrap/Button';
import { getOneCarInfo } from '../../helper/Service';

const CarDetails = ({ stockNumber }) => {
	const [ carDetails, setCarDetails ] = useState({});

	useEffect(() => {
		getOneCarInfo(stockNumber).then( ({ data }) => {
			const { car } = data;
			setCarDetails(car);
		});
	}, [stockNumber]);

	const addFavorite = carInfo => console.log(carInfo);

	return(
		<main className="car__details">
	        <TopHeader />
	        <section className="car__details--content">
	        	<div className='car__details--img' >
	                 <img
	                  src={carDetails && carDetails.pictureUrl} alt={carDetails && carDetails.modelName}
	                />
	             </div>
	             <div className='car-view'>
		          <div className='details'>
		            <h1
		              className='details__text--xlarge details__text--margin'
		            >
		              {carDetails && carDetails.modelName}
		            </h1>
		            <h2
		              className='details__text--large details__text--margin'
		            >
		              {`Stock #
		              ${carDetails && carDetails.stockNumber} -
		              ${carDetails && carDetails.mileage ? `${carDetails && carDetails.mileage.number} ${carDetails && carDetails.mileage.unit.toUpperCase()}` : 'none'}-
		              ${carDetails && carDetails.fuelType} -
		              ${carDetails && carDetails.color}` }
		            </h2>
		            <p className='details__text--small details__text--margin'>
		            This car is currently available and can be delivered as soon as
		            tomorrow morning. Please be aware that delivery times shown in
		            this page are not definitive and may change due to bad weather
		            conditions.
		            </p>
		          </div>
		          <div className='save-car'>
		            <div className='save-car__text'>
		              <p className='save-car__text--small'>
		              If you like this car, click the button and
		              save it in your collection of favourite
		              items.
		              </p>
		            </div>
		            <div className='save-car__btn--wrapper'>	              
		              <Button className="filter-button" onClick={() => addFavorite(carDetails)}>Save</Button>
		            </div>
		          </div>
	        </div>
	        </section>
	        <Footer />
	      </main>);
}

export default CarDetails;