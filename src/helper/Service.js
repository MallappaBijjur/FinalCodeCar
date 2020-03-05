import axios from 'axios';

export const getCars = path => {
	return new Promise((res, rej) => {
		return axios.get(`https://auto1-mock-server.herokuapp.com/api/cars${path ? path: ''}`)
			.then(data => res(data))
			.catch(err => {
				rej(err);
			});
	});
}

export const getColors = path => {
	return new Promise((res, rej) => {
		return axios.get("https://auto1-mock-server.herokuapp.com/api/colors")
			.then(data => res(data))
			.catch(err => {
				rej(err);
			});
	});
}

export const getManufacturers = path => {
	return new Promise((res, rej) => {
		return axios.get("https://auto1-mock-server.herokuapp.com/api/manufacturers")
			.then(data => res(data))
			.catch(err => {
				rej(err);
			});
	});
}


export const getOneCarInfo = stockNumber => {
	return new Promise((res, rej) => {
		return axios.get(`https://auto1-mock-server.herokuapp.com/api/cars/${stockNumber}`)
			.then(data => res(data))
			.catch(err => {
				rej(err);
			});
	});
}

