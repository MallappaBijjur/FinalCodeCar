import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup, waitForElement } from '@testing-library/react';
import rerender from 'react-test-renderer';
import CarDetails from '../CarDetails';

let mockPromiseGetCarInfo;

jest.mock('../../../helper/Service', ()=> ({
    getOneCarInfo: jest.fn().mockImplementation(() => mockPromiseGetCarInfo)
}));

describe("CarDetails", () => {

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
		"car": {
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
			 }
	};
    
	it("renders without crashing", ()=>{
        mockPromiseGetCarInfo = Promise.resolve({ data: carsData });
		const div = document.createElement("div");
		ReactDOM.render(<CarDetails  stockNumber={30562} />, div);
	});
	
	it('renders Cars Details and Ducato as Model Name', async () => {
        mockPromiseGetCarInfo = Promise.resolve({ data: carsData });
        const { getByText } = render(<CarDetails stockNumber={30562} />);   
		const linkElement = await waitForElement(() => getByText("Ducato"));
		expect(linkElement).toBeInTheDocument();
	});
	
	it("matches snapshot", ()=> {
		const tree = rerender.create(<CarDetails stockNumber={30562} />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});




