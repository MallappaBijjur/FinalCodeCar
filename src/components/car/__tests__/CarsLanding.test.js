import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import rerender from 'react-test-renderer';
import CarsLanding from '../CarsLanding';

describe("CarsLanding", () => {

	const originalError = console.error
	beforeAll(() => {
		console.error = (...args) => {
			if (/Warning.*not wrapped in act/.test(args[0])) {
				return
			}
			originalError.call(console, ...args)
		}
	})

	afterAll(() => {
		console.error = originalError
	});

	afterEach(cleanup);
	
    const carsData = [
        {
            "stockNumber":30562,
            "manufacturerName":"Fiat",
            "modelName":"Ducato",
            "color":"yellow",
            "mileage":{
                    "number":100013,
                    "unit":"km"
            },
            "fuelType":"Petrol",
            "pictureUrl":"https://auto1-js-task-api--mufasa71.repl.co/images/car.svg"
		},
        {
            "stockNumber":35592,
            "manufacturerName":"Chrysler",
            "modelName":"New Yorker",
            "color":"white",
            "mileage":{
                    "number":100115,
                    "unit":"km"
            },
            "fuelType":"Petrol",
            "pictureUrl":"https://auto1-js-task-api--mufasa71.repl.co/images/car.svg"
        }];
    
	it("renders without crashing", ()=>{
		const div = document.createElement("div");
		ReactDOM.render(<CarsLanding  cars={carsData} totalCarsCount={2} />, div);
	});
	
	it('renders CarsLanding', () => {
        const { queryByTestId } = render(<CarsLanding cars={carsData} totalCarsCount={2} />);   
		const linkElement = queryByTestId(/cars-items/i);
		expect(linkElement).toBeInTheDocument();
	});
	
	it("matches snapshot", ()=> {
		const tree = rerender.create(<CarsLanding cars={carsData} totalCarsCount={2} />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
