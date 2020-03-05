import React from 'react';
import '../home-car.css';

const CarItem = (props) => {
  const carInfo = `Stock #
              ${props.stockNumber} -
              ${props.mileage.number} ${props.mileage.unit.toUpperCase()} -
              ${props.fuelType} -
              ${props.color}`;
  const detaiPageLink = `/car/${props.stockNumber}`;
    return (<div className='car__item' data-testid={`car-${props.stockNumber}`}>
              <div className='car__item__img--container' >
                 <img
                  className='car__item--img'
                  src={props.pictureUrl} alt='Car'
                />
              </div>
              <div className='car__item__details--container'>
                <div className='car__item__details'>
                  <p className='car__item--info landing__top--text--bold margin__set'>{props.modelName}</p>
                  <div className='car__item__text car__item__text--small car__item__width--max '>
                    <p className="car__item__text">{carInfo}</p>
                  </div>
                  <a href={detaiPageLink} className="car__item__text car__item__text--link car__item__text--small pagelink__text--orange">View details</a>
                </div>
              </div>
            </div>)
}

export default CarItem;
