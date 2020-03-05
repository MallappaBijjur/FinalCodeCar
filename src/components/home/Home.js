import React, { useState, useEffect } from 'react';
import Filter from '../filter/Filter';
import CarsLanding from '../car/CarsLanding';
import TopHeader from '../common/TopHeader';
import Footer from '../common/Footer';
import '../home-car.css';
import { getCars, getColors, getManufacturers } from '../../helper/Service';
import { All_COLORS, ALL_MANUFACTURERS } from '../../constants';
import { getApiPath } from '../../utils';

const Home = () =>  {
	const [state, setState] = useState({ cars: [],colors: [], manufacturers: [], totalPageCount: 0, totalCarsCount: 0, currentPageNo: 1, selectedColor: All_COLORS, selectedManufacturer: ALL_MANUFACTURERS });
     
	useEffect(() => {
		const path = getApiPath({ selectedManufacturer: ALL_MANUFACTURERS, selectedColor: All_COLORS, page: 1})
		Promise.all([getCars(path), getColors(), getManufacturers()]).then(values => {
			const { data: carsData} = values[0];
			const { data: colorsData} = values[1];
			const { data: manufacturersData} = values[2];
			setState({ ...carsData, ...colorsData, ...manufacturersData, currentPageNo: 1, selectedColor: All_COLORS, selectedManufacturer: ALL_MANUFACTURERS });
		});
		
	}, []);

	const handleFilter = filterInfo => {
		const path = getApiPath({selectedManufacturer: filterInfo.selectedManufacturer, selectedColor: filterInfo.selectedColor});
		 getCars(path).then(({data}) => {
		 	setState({...state, ...data, selectedColor: filterInfo.selectedColor , selectedManufacturer: filterInfo.selectedManufacturer});
		 });
	}

	const getCarsPerPage = pageInfo => {
		const path = getApiPath({ selectedManufacturer: state.selectedManufacturer, selectedColor: state.selectedColor, page: pageInfo });
		 getCars(path).then(({data}) => {
		 	setState({ ...state, ...data, currentPageNo: pageInfo });
		 });
	}


	return(
		<main className="wrap-container" data-testid="home-main">
			<TopHeader />
			<section className='home-container'>
				<Filter
					colors={state.colors}
					manufacturers={state.manufacturers}
					handleFilter={handleFilter}
				/>
				<CarsLanding 
					cars={state.cars}
					totalCarsCount={state.totalCarsCount}
					totalPageCount={state.totalPageCount}
					currentPageNo={state.currentPageNo}
					getCarsPerPage={getCarsPerPage}
				/>
			</section>
			<Footer />
		</main>
	)
}

export default Home;