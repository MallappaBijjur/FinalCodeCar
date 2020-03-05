import React from 'react';
import "./pagination.css";

const Pagination = props => {
	const { currentPageNo, getCarsPerPage, totalPageCount } = props;

	const handlePrevPage = () => {
		if (currentPageNo - 1 !== 0) {
	      getCarsPerPage(currentPageNo - 1);
	    } else {
	      getCarsPerPage(1)
	    }
	};

	const handleNextPage = () => {
		if (currentPageNo + 1 > totalPageCount) {
	      getCarsPerPage(totalPageCount);
	    } else {
	      getCarsPerPage(currentPageNo + 1);
	    }
	};

	return (<div className='pagination'>
		        <a
		          href='#available cars'
		          className='link__item--text link__item--text--small pagelink__text--orange'
		          onClick={() => getCarsPerPage(1)}
		        >First</a>
		        <a
		          href='#available cars'
		          className='link__item--text link__item--text--small pagelink__text--orange'
		          onClick={() => handlePrevPage()}
		        >Previous</a>
		        <a
		          href='#available cars'
		          className='link__item--text link__item--text--small link__text--black'
		        >{`Page ${currentPageNo} of ${totalPageCount}`}
		        </a>
		        <a
		          href='#available cars'
		          className='link__item--text link__item--text--small pagelink__text--orange'
		          onClick={() => handleNextPage()}
		        >Next</a>
		        <a
		          href='#available cars'
		          className='link__item--text link__item--text--small pagelink__text--orange'
		          onClick={() => getCarsPerPage(totalPageCount)}
		        >Last</a>
	      </div>)
};

export default Pagination;