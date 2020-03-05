import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup, waitForElement } from '@testing-library/react';
import rerender from 'react-test-renderer';
import CarItem from '../CarItem';

describe("CarItem", () => {

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
	
    const carsData = {
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
			 };
    
	it("renders without crashing", ()=>{
		const div = document.createElement("div");
		ReactDOM.render(<CarItem  {...carsData} />, div);
	});
	
	it('renders Cars Details and Ducato as Model Name', async () => {
        const { getByText } = render(<CarItem {...carsData} />);   
		const linkElement = await waitForElement(() => getByText("Ducato"));
		expect(linkElement).toBeInTheDocument();
	});
	
	it("matches snapshot", ()=> {
		const tree = rerender.create(<CarItem {...carsData} />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
