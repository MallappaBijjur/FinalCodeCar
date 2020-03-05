import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import rerender from 'react-test-renderer';
import NotFound from '../NotFound404';

describe("NotFound", () => {

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
		ReactDOM.render(<NotFound />, div);
	});
	
	it('renders Filter component', () => {
        const { getByText } = render(<NotFound />);   
		const linkElement = getByText(/404 - Not Found/i);
		expect(linkElement).toBeInTheDocument();
	});
	
	it("matches snapshot", ()=> {
		const tree = rerender.create(<NotFound />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});




