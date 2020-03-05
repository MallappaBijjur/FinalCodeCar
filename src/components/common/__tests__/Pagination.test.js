import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import rerender from 'react-test-renderer';
import Pagination from '../Pagination';

describe("Pagination", () => {

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
		ReactDOM.render(<Pagination />, div);
	});
	
	it('renders Pagination component', () => {
        const { getByText } = render(<Pagination />);   
        const linkElement = getByText(/First/i);
        expect(linkElement).toBeInTheDocument();
	});
	
	it("matches snapshot", ()=> {
		const tree = rerender.create(<Pagination />).toJSON();
		expect(tree).toMatchSnapshot();
    });
    
    it("should test handlePrevPage method middle page", ()=> {
        const currentPageNo = 5;
        const getCarsPerPage = jest.fn() ;
        const totalPageCount = 10;

        const { getByText } = render(<Pagination
                                        totalPageCount={totalPageCount}
                                        currentPageNo={currentPageNo}
                                        getCarsPerPage={getCarsPerPage}
                                    />);
        fireEvent.click(getByText("Previous"));
        expect(getCarsPerPage.mock.calls.length).toBe(1);
        expect(getCarsPerPage).toHaveBeenCalledWith(4);

    });

    it("should test handlePrevPage method when for the first page", ()=> {
        const currentPageNo = 1;
        const getCarsPerPage = jest.fn() ;
        const totalPageCount = 10;

        const { getByText } = render(<Pagination
                                        totalPageCount={totalPageCount}
                                        currentPageNo={currentPageNo}
                                        getCarsPerPage={getCarsPerPage}
                                    />);
        fireEvent.click(getByText("Previous"));
        expect(getCarsPerPage.mock.calls.length).toBe(1);
        expect(getCarsPerPage).toHaveBeenCalledWith(1);

    });

    it("should test handlePrevPage method when for the last page", ()=> {
        const currentPageNo = 10;
        const getCarsPerPage = jest.fn() ;
        const totalPageCount = 10;

        const { getByText } = render(<Pagination
                                        totalPageCount={totalPageCount}
                                        currentPageNo={currentPageNo}
                                        getCarsPerPage={getCarsPerPage}
                                    />);
        fireEvent.click(getByText("Previous"));
        expect(getCarsPerPage.mock.calls.length).toBe(1);
        expect(getCarsPerPage).toHaveBeenCalledWith(9);

    });

    it("should test handleNextPage method for first page", ()=> {
        const currentPageNo = 1;
        const getCarsPerPage = jest.fn() ;
        const totalPageCount = 10;

        const { getByText } = render(<Pagination
                                        totalPageCount={totalPageCount}
                                        currentPageNo={currentPageNo}
                                        getCarsPerPage={getCarsPerPage}
                                    />);
        fireEvent.click(getByText("Next"));
        expect(getCarsPerPage.mock.calls.length).toBe(1);
        expect(getCarsPerPage).toHaveBeenCalledWith(2);
    });

    it("should test handleNextPage method for middle page", ()=> {
        const currentPageNo = 5;
        const getCarsPerPage = jest.fn() ;
        const totalPageCount = 10;

        const { getByText } = render(<Pagination
                                        totalPageCount={totalPageCount}
                                        currentPageNo={currentPageNo}
                                        getCarsPerPage={getCarsPerPage}
                                    />);
        fireEvent.click(getByText("Next"));
        expect(getCarsPerPage.mock.calls.length).toBe(1);
        expect(getCarsPerPage).toHaveBeenCalledWith(6);
    });

    it("should test handleNextPage method for last page", ()=> {
        const currentPageNo = 10;
        const getCarsPerPage = jest.fn() ;
        const totalPageCount = 10;

        const { getByText } = render(<Pagination
                                        totalPageCount={totalPageCount}
                                        currentPageNo={currentPageNo}
                                        getCarsPerPage={getCarsPerPage}
                                    />);
        fireEvent.click(getByText("Next"));
        expect(getCarsPerPage.mock.calls.length).toBe(1);
        expect(getCarsPerPage).toHaveBeenCalledWith(10);
    });
});
