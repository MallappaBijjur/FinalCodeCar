import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import rerender from 'react-test-renderer';
import Filter from '../Filter';

describe("Filter", () => {

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
    const handleFilter = jest.fn();

	it("renders without crashing", ()=>{
		const div = document.createElement("div");
		ReactDOM.render(<Filter />, div);
	});
	
	it('renders Filter component', () => {
        const { queryByTestId } = render(<Filter
                                        colors={fakeColorData.colors}
                                        manufacturers={fakeManufacturersData.manufacturers}
                                        handleFilter={handleFilter}
                                        />);   
		const linkElement = queryByTestId(/filter-comp/i);
		expect(linkElement).toBeInTheDocument();
	});
	
	it("matches snapshot", ()=> {
		const tree = rerender.create(<Filter
                                        colors={fakeColorData.colors}
                                        manufacturers={fakeManufacturersData.manufacturers}
                                        handleFilter={handleFilter}
                                    />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});




