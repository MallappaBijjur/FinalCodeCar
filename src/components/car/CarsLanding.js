import React from 'react';
import '../home-car.css';
import CarItem from './CarItem';
import Pagination from "../common/Pagination";

const CarsLanding = props => {
	const { cars, totalCarsCount } = props;

	const availableInfo = `Showing ${totalCarsCount > 10 ? 10: totalCarsCount} of ${totalCarsCount} results`

	return(<div className="landing">
			<div className="landing__top">
				<p className="landing__top--text--bold" id="available cars">Available Cars</p>
				<p className="landing__top--info">{availableInfo}</p>
			</div>
			<div data-testid="cars-items">
				{
					cars && cars.map(item => <CarItem key={item.stockNumber} {...item} />)
				}
			</div>
			<Pagination {...props}/>
		</div>);
};

export default CarsLanding;