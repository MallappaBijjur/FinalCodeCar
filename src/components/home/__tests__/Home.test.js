import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, cleanup, waitForElement } from '@testing-library/react';
import Home from '../Home';
import rerender from 'react-test-renderer';
import { getCars, getColors, getManufacturers } from '../../../helper/Service';

let mockPromiseCar;
let mockPromiseColors;
let mockPromiseManufacturers;

jest.mock('../../../helper/Service', () =>({
	getCars: jest.fn().mockImplementation(() => mockPromiseCar),
	getColors: jest.fn().mockImplementation(() => mockPromiseColors), 
	getManufacturers: jest.fn().mockImplementation(() => mockPromiseManufacturers)
}));

describe("Home", () => {

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

	beforeEach(() => {
		getCars.mockClear();
		getColors.mockClear();
		getManufacturers.mockClear();
	});

	
	const carsData = {
		"cars":[
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
			 }]
	};
	const fakeColorData = {"colors":["red","blue","green","black","yellow","white","silver"]};
	const fakeManufacturersData = {
		"manufacturers":[
			 {
					"name":"Audi",
					"models":[]
			 },
			 {
					"name":"BMW",
					"models":[]
			 },
			 {
					"name":"Chrysler",
					"models":[]
			 }]
			};

	it("renders without crashing", ()=>{
		mockPromiseManufacturers= Promise.resolve({ data:[] });
		mockPromiseCar= Promise.resolve({ data:[] });
		mockPromiseColors= Promise.resolve({ data:[] });
		const div = document.createElement("div");
		ReactDOM.render(<Home />, div);
	});
	
	it('renders Home component', () => {
		mockPromiseManufacturers= Promise.resolve({ data:[] });
		mockPromiseCar= Promise.resolve({ data:[] });
		mockPromiseColors= Promise.resolve({ data:[] });
		const { queryByTestId } = render(<Home />);   
		const linkElement = queryByTestId(/home-main/i);
		expect(linkElement).toBeInTheDocument();
	});
	
	it("matches snapshot", ()=> {
		mockPromiseManufacturers= Promise.resolve({ data:[] });
		mockPromiseCar= Promise.resolve({ data:[] });
		mockPromiseColors= Promise.resolve({ data:[] });
		const tree = rerender.create(<Home />).toJSON();
		expect(tree).toMatchSnapshot();
	});
	
	it("should render with api data", ()=> {

		getCars.mockImplementationOnce(() => {
			return Promise.resolve({
				data: carsData
			})
		});
		
		getManufacturers.mockImplementationOnce(() => {
			return Promise.resolve({
				data: fakeManufacturersData
			})
		})
		
		getColors.mockImplementationOnce(() => {
			return Promise.resolve({
				data: fakeColorData
			})
		});

		render(<Home />);
		expect(getCars).toHaveBeenCalledTimes(1);
		expect(getColors).toHaveBeenCalledTimes(1);
		expect(getManufacturers).toHaveBeenCalledTimes(1);
	});

	//TODO 
	it("should test filter functionality", async ()=> {
		
		getCars.mockImplementationOnce(() => {
			return Promise.resolve({
				data: carsData
			})
		});
		
		getManufacturers.mockImplementationOnce(() => {
			return Promise.resolve({
				data: fakeManufacturersData
			})
		})
		
		getColors.mockImplementationOnce(() => {
			return Promise.resolve({
				data: fakeColorData
			})
		});

		const { getByTestId } = render(<Home />);
			fireEvent.click(getByTestId("filter"), { target: { value: { manufacturerName: "Fiat", selectedColor: ""}}});
			const car = await waitForElement (() =>getByTestId("car-30562"));
			const carItems = getByTestId("cars-items");
			expect(car).toHaveTextContent(/View details/i);
			expect(carItems.children.length).toBe(2);
	});
});




