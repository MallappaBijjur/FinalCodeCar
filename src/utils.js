import { All_COLORS, ALL_MANUFACTURERS } from './constants';

export const getApiPath = pathInfo => {
	const query1 =pathInfo.selectedManufacturer === ALL_MANUFACTURERS ? '' :`manufacturer=${pathInfo.selectedManufacturer}&` ;
	const query2 =pathInfo.selectedColor === All_COLORS ? '' :`color=${pathInfo.selectedColor}&` ;
	const query3 = pathInfo.page? `&page=${pathInfo.page}`: '&page=1';
	return `?${query1}${query2}sort=asc${query3}`;
}