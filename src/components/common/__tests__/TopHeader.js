import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import rerender from 'react-test-renderer';
import TopHeader from '../TopHeader';

describe("TopHeader", () => {

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
	
	it("renders without crashing", ()=>{
		const div = document.createElement("div");
		ReactDOM.render(<TopHeader />, div);
	});
	
	it('renders Header component', () => {
        const { getByText, getByTestId } = render(<TopHeader />);   
        const linkElement = getByText(/Purchase/i);
        const elem = getByTestId("header"); 
        expect(linkElement).toBeInTheDocument();
        expect(elem.children.length).toBe(3);
	});
	
	it("matches snapshot", ()=> {
		const tree = rerender.create(<TopHeader />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});




