import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import rerender from 'react-test-renderer';
import Footer from '../Footer';

describe("Footer", () => {

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
		ReactDOM.render(<Footer />, div);
	});
	
	it('renders Filter component', () => {
        const { getByText } = render(<Footer />);   
		const linkElement = getByText(/© AUTO1 Group 2018/i);
		expect(linkElement).toBeInTheDocument();
	});
	
	it("matches snapshot", ()=> {
		const tree = rerender.create(<Footer />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});




